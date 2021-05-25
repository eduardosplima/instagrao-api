import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  content: string;
}
