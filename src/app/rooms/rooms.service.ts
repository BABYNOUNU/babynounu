// src/room/room.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Room } from './models/room.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class RoomsService {
  constructor(
    @Inject('ROOMS_REPOSITORY')
    private roomRepository: Repository<Room>,
    private readonly userService: UserService,
  ) {}

  async findOne(id: number): Promise<Room> {
    const getRoom:any = await this.roomRepository.findOne({
      where: { id },
      relations: {
        nounou: { user: {medias: {type_media: true}} },
        parent: { user: {medias: {type_media: true}} },
      },
    });

    let photo:any;

    if(getRoom) {
      getRoom.photo = getRoom[getRoom.nounou?.id ? 'nounou' : 'parent'].user.medias.find((uk) => uk.type_media.slug == 'image-profil')
    }

    return getRoom;
  }

  async findOrCreate(parentId: number, nounouId: number): Promise<Room> {
    let room = await this.roomRepository.findOne({
      where: { parent: { id: parentId }, nounou: { id: nounouId } },
     
    });

    if (!room) {
      room = this.roomRepository.create({
        parent: { id: parentId },
        nounou: { id: nounouId },
      });
      await this.roomRepository.save(room);
    }

    return {
      ...room
    };
  }

  async incrementUnreadCount(
    roomId: number,
    role: 'parent' | 'nounu' | 'administrateur',
  ): Promise<void> {
    const field = `${role}UnreadCount`;
    await this.roomRepository.increment({ id: roomId }, field, 1);
  }

  async resetUnreadCount(
    roomId: number,
    role: 'parent' | 'nounu' | 'administrateur',
  ): Promise<void> {
    const field = `${role}UnreadCount`;
    await this.roomRepository.update(roomId, { [field]: 0 });
  }

  async getConversationsForUser(userId: string): Promise<any[]> {
    const user = await this.userService.findOne(userId);
    let rooms: Room[];

    if (user.type_profil.slug === 'administrateur') {
      rooms = await this.roomRepository.find({
        relations: {
          parent: { user: {medias: {type_media: true}}, contracts: true },
          nounou: { user: {medias: {type_media: true}} },
          messages: true,
        },
      });
    } else if (user.type_profil.slug === 'parent') {
      rooms = await this.roomRepository.find({
        where: { parent: { user: { id: user.id } } },
        relations: {
          nounou: { user: {medias: {type_media: true}} },
          messages: true,
        },
      });
    } else if (user.type_profil.slug === 'nounou') {
      rooms = await this.roomRepository.find({
        where: { nounou: { user: { id: user.id.toString() } } },
        relations: {
          parent: { user: {medias: {type_media: true}} },
          messages: true,
        },
      });
    } else {
      return [];
    }

    // Ajouter le dernier message à chaque conversation
    return rooms.map((room) => {
      const lastMessage =
        room.messages?.length > 0
          ? room.messages.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )[0]
          : null;

      return {
        ...room,
        photo:  room['nounou'].user.medias.find((uk) => uk.type_media.slug == 'image-profil'),
        photoParent: room['parent'] ? room['parent'].user.medias.find((uk) => uk.type_media.slug == 'image-profil') : null,
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              createdAt: lastMessage.createdAt,
              isRead: lastMessage.isRead,
            }
          : null,
      };
    }).reverse();
  }

  async getGlobalUnreadCounts(roomId:number, userId: string): Promise<{
    parentUnread: number;
    nounouUnread: number;
    adminUnread: number;
  }> {
    const rooms = await this.roomRepository.find({
      where: [
        { parent: { user: { id: userId } } },
        { nounou: { user: { id: Not(userId) } } },
      ],
      relations: {parent: {user: true}, nounou: {user: true}}
    });

    let parentUnread = 0;
    let nounouUnread = 0;
    let adminUnread = 0;

    rooms.forEach((room) => {
   
        parentUnread += room.parentUnreadCount;
        nounouUnread += room.nounuUnreadCount;
      adminUnread += room.administrateurUnreadCount;
    });

    return { parentUnread, nounouUnread, adminUnread };
  }
}
