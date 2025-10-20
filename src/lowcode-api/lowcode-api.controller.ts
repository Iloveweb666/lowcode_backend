import { Body, Controller, Post } from '@nestjs/common';
import { LowcodeApiService } from './lowcode-api.service';

// Routes under this controller will be prefixed by the global '/lowcode-api'
@Controller('nodes')
export class LowcodeApiController {
  constructor(private readonly service: LowcodeApiService) {}

  // Accepts JSON body with a 'nodes' field
  @Post()
  handleNodes(@Body('nodes') nodes: unknown) {
    return this.service.processNodes(nodes);
  }
}
