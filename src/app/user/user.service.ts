import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {
  }

  async user(slug: any): Promise<User | null> {

    const IsUserExist = await this.userRepository.findOne({
      where: {slug},
    });

    if(!IsUserExist){
      throw new BadRequestException({ message: 'user not exist in database' });
    }

    return {
      ...IsUserExist
    }
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
    const User = await this.userRepository.findOne({ where: { id: ID }, relations: ['role', 'medias', 'type_profil', 'parent', 'nounu', 'nounu.preferences.adress', 'abonnement'] });
    if (!User) {
      throw new BadRequestException({ message: 'user not exist in database' });
    }

    const dataUser = await this.ReturnN([User], ['adress']);
    return dataUser[0];
  }


  async ReturnN(datas: any[], preferenceKey: any[]): Promise<any[]> {
      return datas.map((data) => {
        // Regrouper les libellés similaires dans des tableaux distincts
        const aggregatedPreferences = {};
        preferenceKey.forEach((key) => {
          aggregatedPreferences[key] = [];
        });
  
        data[data.type_profil.slug].preferences.forEach((pref) => {
          preferenceKey.forEach((key) => {
            if (pref[key]) aggregatedPreferences[key].push(pref[key]);
          });
        });
  
        return {
          ...data,
          image: data.user.medias.find(
            (media) => media.type_media.slug === 'image-profil',
          ),
          preferences: aggregatedPreferences, // Remplace les préférences par la version agrégée
        };
      })
    }
}
