import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    try {
      const rooms = await this.roomRepository.find({
        where: [{ receiver: { id: userId } }, { sender: { id: userId } }],
        relations: [
          'receiver',
          'sender',
          'nounou.user.medias.type_media',
          'parent.user.medias.type_media',
        ],
      });

      if (!rooms.length) {
        return [];
      }

      const conversations = await Promise.all(
        rooms.map(async (room) => {
          const [lastMessage, unreadCount] = await Promise.all([
            this.messageRepository.findOne({
              where: { room: { id: room.id } },
              order: { createdAt: 'DESC' },
            }),
            this.unreadCountRepository.findOne({
              where: {
                room: { id: room.id },
                user: { id: userId },
                count: MoreThan(0),
              },
            })
          ]);

          return {
            room,
            nounuPhoto: this.extractProfilePhoto(room.nounou?.user?.medias),
            parentPhoto: this.extractProfilePhoto(room.parent?.user?.medias),
            lastMessage,
            unreadCount: unreadCount?.count || 0,
          };
        }),
      );

      return conversations;
    } catch (error) {
      throw new Error(`Failed to get user conversations: ${error.message}`);
    }
  }

  // Helper method to extract profile photo
  private extractProfilePhoto(medias: any[]) {
    if (!medias || !Array.isArray(medias) || medias.length === 0) {
      return null;
    }
    return medias.find((media) => media?.type_media?.slug === 'image-profil') || null;
  }

  // Create or get existing conversation
  async createOrGetRoom(senderId: string, parentId: string, nounouId: string) {
    if (!senderId || !parentId || !nounouId) {
      throw new BadRequestException('Sender ID, Parent ID, and Nounou ID are required');
    }
  
    if (!process.env.USER_ADMIN_ID) {
      throw new Error('USER_ADMIN_ID environment variable is not configured');
    }
  
    try {
      let room = await this.roomRepository.findOne({
        where: { nounou: { id: nounouId }, parent: { id: parentId } },
        relations: [
          'nounou.user.medias.type_media',
          'parent.user.medias.type_media',
          'sender',
          'receiver'
        ],
      });
  
      if (!room) {
        // Créer la room d'abord
        room = this.roomRepository.create({
          sender: { id: senderId },
          receiver: { id: process.env.USER_ADMIN_ID },
          parent: { id: parentId },
          nounou: { id: nounouId },
        });
        room = await this.roomRepository.save(room);
  
        // Recharger la room avec toutes les relations nécessaires
        room = await this.roomRepository.findOne({
          where: { id: room.id },
          relations: [
            'nounou.user.medias.type_media',
            'parent.user.medias.type_media',
            'sender',
            'receiver'
          ],
        });
  
        if (!room) {
          throw new Error('Failed to retrieve created room');
        }
  
        // Initialize unread counts for both users
        await this.initializeUnreadCounts(room.id, senderId, process.env.USER_ADMIN_ID);
      }
  
      return {
        ...room,
        photo: this.getConversationPhoto(senderId, room),
      };
    } catch (error) {
      console.error('Error in createOrGetRoom:', error);
      throw new Error(`Failed to create or get room: ${error.message}`);
    }
  }

  // Helper method to get conversation photo
  private getConversationPhoto(senderId: string, room: any) {
    try {
      // Vérifier si le senderId correspond au parent
      if (room.parent?.user?.id && senderId === room.parent.user.id) {
        return this.extractProfilePhoto(room.nounou?.user?.medias);
      }
      // Sinon, retourner la photo du parent
      return this.extractProfilePhoto(room.parent?.user?.medias);
    } catch (error) {
      console.error('Error in getConversationPhoto:', error);
      return null;
    }
  }

  private async initializeUnreadCounts(
    roomId: number,
    user1Id: string,
    user2Id: string,
  ) {
    try {
      const counts = [
        this.unreadCountRepository.create({
          room: { id: roomId },
          user: { id: user1Id },
          count: 0,
        }),
        this.unreadCountRepository.create({
          room: { id: roomId },
          user: { id: user2Id },
          count: 0,
        })
      ];

      await this.unreadCountRepository.save(counts);
    } catch (error) {
      throw new Error(`Failed to initialize unread counts: ${error.message}`);
    }
  }

  // Get total unread messages count for a user
  async getTotalUnreadCount(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    try {
      const result = await this.unreadCountRepository
        .createQueryBuilder('unread')
        .select('COALESCE(SUM(unread.count), 0)', 'total')
        .where('unread.user.id = :userId', { userId })
        .getRawOne();

      return parseInt(result.total, 10) || 0;
    } catch (error) {
      throw new Error(`Failed to get total unread count: ${error.message}`);
    }
  }

  // Increment unread counter for a room (for the receiver)
  async incrementUnreadCount(roomId: number, userId: string) {
    if (!roomId || !userId) {
      throw new BadRequestException('Room ID and User ID are required');
    }

    try {
      await this.unreadCountRepository
        .createQueryBuilder()
        .update(RoomMessageCount)
        .set({ count: () => 'count + 1' })
        .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
        .execute();

      return this.getRoomUnreadCount(roomId, userId);
    } catch (error) {
      throw new Error(`Failed to increment unread count: ${error.message}`);
    }
  }

  // Reset unread counter for a room
  async resetUnreadCount(roomId: number, userId: string) {
    if (!roomId || !userId) {
      throw new BadRequestException('Room ID and User ID are required');
    }

    try {
      await this.unreadCountRepository
        .createQueryBuilder()
        .update(RoomMessageCount)
        .set({ count: 0 })
        .where('room.id = :roomId AND user.id = :userId', { roomId, userId })
        .execute();

      return { roomId, userId, count: 0 };
    } catch (error) {
      throw new Error(`Failed to reset unread count: ${error.message}`);
    }
  }

  // Get room by ID
  async getRoom(roomId: number, senderId?: any) {
    if (!roomId) {
      throw new BadRequestException('Room ID is required');
    }

    try {
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

      if (!room) {
        throw new NotFoundException(`Room with ID ${roomId} not found`);
      }

      return {
        ...room,
        photo: senderId?.id !== room.parent?.user?.id
          ? this.extractProfilePhoto(room.parent?.user?.medias)
          : this.extractProfilePhoto(room.nounou?.user?.medias),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to get room: ${error.message}`);
    }
  }

  // Get unread count for a specific room and user
  async getRoomUnreadCount(roomId: number, userId: string) {
    if (!roomId || !userId) {
      throw new BadRequestException('Room ID and User ID are required');
    }

    try {
      const unread = await this.unreadCountRepository.findOne({
        where: {
          room: { id: roomId },
          user: { id: userId },
        },
      });

      return unread?.count || 0;
    } catch (error) {
      throw new Error(`Failed to get room unread count: ${error.message}`);
    }
  }
}
