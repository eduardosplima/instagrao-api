import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto, user: number): Promise<number> {
    const post = new Post();
    const date = new Date();

    Object.assign(post, createPostDto);
    post.createdAt = date;
    post.updatedAt = date;
    post.isDeleted = false;
    post.user = user;

    return this.postsRepository.create(post);
  }

  async findAllByUser(user: number): Promise<Array<Post>> {
    return this.postsRepository.findAll(
      { user, isDeleted: false },
      { updatedAt: 'DESC' },
    );
  }

  async findOneByUser(id: number, user: number): Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    return post?.user === user ? post : null;
  }

  async updateByUser(
    id: number,
    updatePostDto: UpdatePostDto,
    user: number,
  ): Promise<boolean> {
    const post = new Post();

    Object.assign(post, updatePostDto);
    post.updatedAt = new Date();

    const result = await this.postsRepository.update({ id, user }, post);
    return result.affected === 1;
  }

  async removeByUser(id: number, user: number): Promise<boolean> {
    const result = await this.postsRepository.remove({
      id,
      user,
      isDeleted: false,
    });
    return result.affected === 1;
  }
}
