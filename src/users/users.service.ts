import { Injectable } from '@nestjs/common';

import { HashBase64Util } from '../commom/utils/hash-base64.util';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async findByLogin(login: string): Promise<User> {
    return this.usersRepository.findByLogin(login);
  }

  async create(user: Partial<User>): Promise<number> {
    const userAux = new User();
    userAux.login = user.login;
    userAux.salt = HashBase64Util.generateSalt();
    userAux.pswd = await HashBase64Util.hashData(user.pswd, userAux.salt);
    return this.usersRepository.create(userAux);
  }

  async update(user: Partial<User>): Promise<void> {
    const userAux = new User();
    userAux.id = user.id;
    userAux.login = user.login;
    userAux.salt = HashBase64Util.generateSalt();
    userAux.pswd = await HashBase64Util.hashData(user.pswd, userAux.salt);
    return this.usersRepository.update(userAux);
  }
}
