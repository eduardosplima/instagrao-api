import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReqUser } from '../commom/decorators/req-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @ReqUser() user: User,
  ): Promise<unknown> {
    const id = await this.postsService.create(createPostDto, user.id);
    return { id };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@ReqUser() user: User): Promise<unknown> {
    return this.postsService.findAllByUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @ReqUser() user: User,
  ): Promise<unknown> {
    const post = await this.postsService.findOneByUser(id, user.id);
    if (post) return post;

    throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @ReqUser() user: User,
  ): Promise<void> {
    const result = await this.postsService.updateByUser(
      id,
      updatePostDto,
      user.id,
    );
    if (!result) throw new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @ReqUser() user: User,
  ): Promise<void> {
    const result = await this.postsService.removeByUser(id, user.id);
    if (!result) throw new NotFoundException();
  }
}
