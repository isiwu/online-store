import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createOrUpdate(user: User) {
    const hash = await bcrypt.hash(user.getPassword(), 10);
    user.setPassword(hash);

    return this.usersRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.getPassword());

      if (isMatch) return user;
    }

    return null;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id: Number(id) } });
  }

  updateBalance(id: number, balance: number) {
    return this.usersRepository.update(id, { balance: balance });
  }
}
