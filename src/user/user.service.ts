import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async findOne(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      return user;
    }
    return null;
  }

  async createUser(user: { email: string, password: string }) {
    let result = await this.userRepository.save(user);
    return result;
  }
}

