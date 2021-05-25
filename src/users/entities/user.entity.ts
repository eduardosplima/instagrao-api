import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  login: string;

  @Column()
  pswd: string;

  @Column()
  salt: string;
}
