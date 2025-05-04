import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { UserService } from '../user/user.service';
import { Rooms } from './models/room.model';
import { RoomMessageCount } from './models/unreadCount.model';
import { Message } from '../messages/models/message.model';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOMS_REPOSITORY')
    private roomRepository: Repository<Rooms>,
    @Inject('MESSAGE_REPOSITORY')
    private readonly messageRepository: Repository<Message>,
    @Inject('UNREAD_REPOSITORY')
    private readonly unreadCountRepository: Repository<RoomMessageCount>,
  ) {}

  // Get all conversations for a user with last message and unread count
  async getUserConversations(userId: string) {
    const rooms = await this.roomRepository.find({
      where: [{ receiver: { id: userId } }, { sender: { id: userId } }],
      relations: [
        'receiver',
        'sender',
        'nounou.user.medias.type_media',
        'parent.user.medias.type_media',
      ],
    });

    const conversations = await Promise.all(
      rooms.map(async (room) => {
        const lastMessage = await this.messageRepository.findOne({
          where: { room: { id: room.id } },
          order: { createdAt: 'DESC' },
        });

        const unreadCount = await this.unreadCountRepository.findOne({
          where: {
            room: { id: room.id },
            user: { id: userId },
            count: MoreThan(0),
          },
        });

        return {
          room,
          nounuPhoto:
            room.nounou.user.medias.length > 0
              ? room.nounou.user.medias.find(
                  (media) => media.type_media.slug === 'image-profil',
                )
              : null,
          parentPhoto:
            room.parent.user.medias.length > 0
              ? room.parent.user.medias.find(
                  (media) => media.type_media.slug === 'image-profil',
                )
              : null,
          lastMessage,
          unreadCount: unreadCount ? unreadCount.count : 0,
        };
      }),
    );

    return conversations;
  }

  // Create or get existing conversation
  async createOrGetRoom(senderId: string, parentId: string, nounouId: string) {
    let receiverId = process.env.USER_ADMIN_ID;
    let room = await this.roomRepository.findOne({
      where: [{ nounou: { id: nounouId }, parent: { id: parentId } }],
      relations: [
        'nounou.user.medias.type_media',
        'parent.user.medias.type_media',
      ],
    });

    if (!room) {
      room = this.roomRepository.create({
        sender: { id: senderId },
        receiver: { id: process.env.USER_ADMIN_ID },
        parent: { id: parentId },
        nounou: { id: nounouId },
      });
      await this.roomRepository.save(room);

      // Initialize unread counts for both users
      await this.initializeUnreadCounts(room.id, senderId, receiverId);
    }

    return {
      ...room,
      photo:
      senderId == room.parent.user.id
      ? room.parent.user.medias?.find(
          (media) => media.type_media.slug === 'image-profil',
        )
      : room.nounou.user.medias?.find(
          (media) => media.type_media.slug === 'image-profil',
        ),
    };
  }

  private async initializeUnreadCounts(
    roomId: number,
    user1Id: string,
    user2Id: string,
  ) {
    const count1 = this.unreadCountRepository.create({
      room: { id: roomId },
      user: { id: user1Id },
      count: 0,
    });

    const count2 = this.unreadCountRepository.create({
      room: { id: roomId },
      user: { id: user2Id },
      count: 0,
    });

    await this.unreadCountRepository.save([count1, count2]);
  }

  // Get total unread messages count for a user
  async getTotalUnreadCount(userId: string) {
    const result = await this.unreadCountRepository
      .createQueryBuilder('unread')
      .select('SUM(unread.count)', 'total')
      .where('unread.user.id = :userId', { userId })
      .getRawOne();

    return parseInt(result.total) || 0;
  }

  // Increment unread counter for a room (for the receiver)
  async incrementUnreadCount(roomId: number, userId: string) {
    await this.unreadCountRepository
      .createQueryBuilder()
      .update(RoomMessageCount)
      .set({ count: () => 'count + 1' })
      .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
      .execute();

    return this.getRoomUnreadCount(roomId, userId);
  }

  // Reset unread counter for a room
  async resetUnreadCount(roomId: number, userId: string) {
    await this.unreadCountRepository
      .createQueryBuilder()
      .update(RoomMessageCount)
      .set({ count: 0 })
      .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
      .execute();

    return { roomId, userId, count: 0 };
  }

  // Get room by ID
  async getRoom(roomId: number, senderId?: string) {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: [
        'receiver',
        'sender',
        'nounou.user.medias.type_media',
        'parent.user.medias.type_media',
        'contract.message',
      ],
    });

    return {
      ...room,
      photo:
        senderId == room.parent.user.id
          ? room.parent.user.medias?.find(
              (media) => media.type_media.slug === 'image-profil',
            )
          : room.nounou.user.medias?.find(
              (media) => media.type_media.slug === 'image-profil',
            ),
    };
  }

  // Get unread count for a specific room and user
  async getRoomUnreadCount(roomId: number, userId: string) {
    const unread = await this.unreadCountRepository.findOne({
      where: {
        room: { id: roomId },
        user: { id: userId },
      },
    });

    return unread ? unread.count : 0;
  }
}
