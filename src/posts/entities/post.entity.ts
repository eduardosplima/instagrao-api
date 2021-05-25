import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  image: string;

  @Column()
  content: string;

  @Column()
  isDeleted: boolean;
}
