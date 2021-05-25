import { IsNotEmpty } from 'class-validator';

export class LogonDto {
  @IsNotEmpty({ message: 'Login obrigatório' })
  login: string;

  @IsNotEmpty({ message: 'Senha obrigatória' })
  pswd: string;
}
