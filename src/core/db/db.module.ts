import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { PinoService } from '../logger/pino.service';

import dbConfig from './config/db.config';
import { TypeORMLoggerService } from './type-orm-logger.service';

import type { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig), LoggerModule],
      inject: [dbConfig.KEY, PinoService],
      useFactory: (
        config: ConfigType<typeof dbConfig>,
        pinoService: PinoService,
      ) => ({
        ...config.options,
        entities: [
          resolve(__dirname, '..', '..', '**/entities/**/*.entity.{js,ts}'),
        ],
        logging: pinoService.logger.isLevelEnabled('debug'),
        logger: new TypeORMLoggerService(
          pinoService.logger.child({ context: 'TypeORM' }),
        ),
      }),
    }),
  ],
})
export class DbModule {}
