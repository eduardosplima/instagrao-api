import { AbstractRepository, EntityRepository } from 'typeorm';

import { Post } from '../entities/post.entity';

import type { FindConditions, FindOneOptions, UpdateResult } from 'typeorm';

@EntityRepository(Post)
export class PostsRepository extends AbstractRepository<Post> {
  async create(post: Partial<Post>): Promise<number> {
    const result = await this.repository.insert(post);
    return result.identifiers[0].id;
  }

  async findAll(
    where: FindConditions<Post>,
    order?: FindOneOptions<Post>['order'],
  ): Promise<Array<Post>> {
    return this.repository.find({
      where,
      order,
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.repository.findOne(id);
  }

  async update(
    where: FindConditions<Post>,
    post: Partial<Post>,
  ): Promise<UpdateResult> {
    return this.repository.update(where, post);
  }

  async remove(where: FindConditions<Post>): Promise<UpdateResult> {
    return this.update(where, { isDeleted: true });
  }
}
