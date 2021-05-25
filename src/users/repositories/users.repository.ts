import { AbstractRepository, EntityRepository } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends AbstractRepository<User> {
  async findById(id: number): Promise<User> {
    return this.repository.findOne(id);
  }

  async findByLogin(login: string): Promise<User> {
    return this.repository.findOne({ where: { login } });
  }

  async create(user: User): Promise<number> {
    const result = await this.repository.insert(user);
    return result.identifiers[0] as unknown as number;
  }

  async update(user: User): Promise<void> {
    await this.repository.update({ id: user.id }, user);
  }
}
