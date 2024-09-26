import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async user(userWhereUniqueInput: any): Promise<User | null> {
    return this.userRepository.findOne({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: { name: string; email: string }): Promise<User> {
    const newUser = this.userRepository.create({
      email: data.email,
      name: data.name,
    });

    return await this.userRepository.save(newUser);
  }

  async deleteUser(where: any) {
    this.userRepository.delete({ id: where });
    return { message: 'User deleted' };
  }
}
