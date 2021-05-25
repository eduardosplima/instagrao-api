import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { HttpLoggerDEV } from '../commom/decorators/http-logger.decorator';
import { CustomHttpException } from '../commom/exceptions/custom-http.exception';

import { AuthService } from './auth.service';
import { LogonDto } from './dto/logon.dto';
import { LogonException } from './exceptions/logon.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logon')
  @HttpCode(HttpStatus.OK)
  @HttpLoggerDEV({
    level: 'debug',
    redact: {
      body: {
        paths: ['pswd'],
        censor: '*****',
      },
    },
  })
  async logon(@Body() body: LogonDto): Promise<unknown> {
    try {
      const result = await this.authService.logon(body.login, body.pswd);
      return result;
    } catch (error) {
      if (error instanceof LogonException) {
        throw new CustomHttpException(
          'Login e/ou senha inválida',
          HttpStatus.BAD_REQUEST,
          error,
        );
      }

      throw error;
    }
  }
}
