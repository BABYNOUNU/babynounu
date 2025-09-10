import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { Socket } from 'socket.io';

@Injectable()
export class UserService {
  // Map pour stocker les connexions socket des utilisateurs
  private userSockets = new Map<number, string>(); // userID -> socketID
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async user(slug: any): Promise<User | null> {
    const IsUserExist = await this.userRepository.findOne({
      where: { slug },
    });

    if (!IsUserExist) {
      throw new BadRequestException({ message: 'user not exist in database' });
    }

    return {
      ...IsUserExist,
    };
  }

  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: { fullname: string; email: string }): Promise<User> {
    const newUser = this.userRepository.create({
      email: data.email,
    });

    return await this.userRepository.save(newUser);
  }

  async updateUser(data: { fullname: string; email: string }): Promise<User> {
    const newUser = this.userRepository.create({
      email: data.email,
    });

    return await this.userRepository.save(newUser);
  }

  async deleteUser(where: any) {
    this.userRepository.delete({ id: where });
    return { message: 'User deleted' };
  }

  async loggedUser(ID: any): Promise<User | null> {
    const User = await this.userRepository.findOne({
      where: { id: ID },
      relations: [
        'role',
        'medias.type_media',
        'type_profil',
        'parent',
        'nounu',
        'nounu.preferences.adress',
        'parent.preferences.adress',
        'abonnement',
      ],
    });

    if (!User) {
      throw new BadRequestException({ message: 'user not exist in database' });
    }
    const dataUser =
      User.role.slug == 'admin'
        ? [User]
        : await this.ReturnN([User], ['adress'], User.type_profil?.slug);

    return dataUser[0];
  }

  // Enregistrer la socket d'un utilisateur
  registerSocket(userId: any, socketId: string) {
    this.userSockets.set(userId, socketId);
  }

  // Supprimer l'enregistrement d'une socket
  removeSocket(userId: any) {
    this.userSockets.delete(userId);
  }

  // Trouver l'ID de socket d'un utilisateur
  findSocket(userId: any): string | undefined {
    return this.userSockets.get(userId);
  }

  // Trouver tous les IDs de socket des admins
  findAdminSockets(): string[] {
    const adminSockets: string[] = [];

    // Parcourir toutes les entrées pour trouver les admins
    this.userSockets.forEach((socketId, userId) => {
      // Note: Dans une vraie application, vous devriez vérifier le rôle dans la base de données
      // Ceci est une simplification pour l'exemple
      if (this.isAdmin(userId)) {
        adminSockets.push(socketId);
      }
    });

    return adminSockets;
  }

  // Méthode helper pour vérifier si un utilisateur est admin
  private async isAdmin(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId.toString() },
      select: ['role'],
    });
    return user?.role.slug === 'admin';
  }

  // Trouver un utilisateur par ID
  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id: id},
      relations: {
        nounu: true,
        parent: true,
        role: true,
        type_profil: true
      },
    });
  }

  async ReturnN(
    datas: any[],
    preferenceKey: any[],
    type_profil: any,
  ): Promise<any[]> {
    return datas.map((data) => {
      // Regrouper les libellés similaires dans des tableaux distincts
      const aggregatedPreferences = {};
      preferenceKey.forEach((key) => {
        aggregatedPreferences[key] = [];
      });

      data[type_profil][0]?.preferences?.forEach((pref) => {
        preferenceKey.forEach((key) => {
          if (pref[key]) aggregatedPreferences[key].push(pref[key]);
        });
      });

      data[type_profil][0].preferences = aggregatedPreferences;

      const profil = data.nounu.length > 0 ? data.nounu[0] : data.parent[0];
      profil.image = data.medias.find(
        (media) => media.type_media?.slug === 'image-profil',
      );

      return {
        ...data,
        profil,
        image: data.medias.find(
          (media) => media.type_media?.slug === 'image-profil',
        ),
      };
    });
  }
}
