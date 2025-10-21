import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowcodeModule } from './lowcode/lowcode.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


const dbEnabled = (process.env.DB_ENABLED ?? 'false') === 'true';

const typeOrmImports =
  dbEnabled
    ? [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'mysql',

            host: config.get<string>('DB_HOST') ?? 'localhost',
            port: parseInt(config.get<string>('DB_PORT') ?? '3306', 10),
            username: config.get<string>('DB_USER') ?? 'root',
            password: config.get<string>('DB_PASS') ?? '',
            database: config.get<string>('DB_NAME') ?? 'lowcode',
            autoLoadEntities: true,
            synchronize: (config.get<string>('DB_SYNC') ?? 'false') === 'true',
          }),
        }),
      ]
    : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...typeOrmImports,
    ...(dbEnabled ? [LowcodeModule] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
