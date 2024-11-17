import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { SettingGeneraleService } from '../setting/_partiels/general.service';

@Injectable()
export class UserService extends SettingGeneraleService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {
    super()
  }

  async user(slug: any): Promise<User | null> {

    // Verify Slug
    this.Verify_slug(this.userRepository, slug, "User")

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

  loggedUser() {
    return { message: 'User is connected', status: true };
  }
}
