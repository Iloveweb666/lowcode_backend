import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LowcodeController } from './lowcode.controller';
import { LowcodeService } from './lowcode.service';
import { LowcodePageEntity } from './lowcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LowcodePageEntity])],
  controllers: [LowcodeController],
  providers: [LowcodeService],
})
export class LowcodeModule {}