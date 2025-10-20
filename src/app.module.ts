import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LowcodeApiModule } from './lowcode-api/lowcode-api.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmImports =
  process.env.DB_ENABLED === 'true'
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
            synchronize: false,
          }),
        }),
      ]
    : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...typeOrmImports,
    LowcodeApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
