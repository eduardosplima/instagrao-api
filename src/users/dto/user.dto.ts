import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Login obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'Senha obrigatória' })
  pswd: string;
}
