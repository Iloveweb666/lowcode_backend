import { Module } from '@nestjs/common';
import { LowcodeApiController } from './lowcode-api.controller';
import { LowcodeApiService } from './lowcode-api.service';

@Module({
  controllers: [LowcodeApiController],
  providers: [LowcodeApiService],
})
export class LowcodeApiModule {}
