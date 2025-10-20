import { Injectable } from '@nestjs/common';

@Injectable()
export class LowcodeApiService {
  processNodes(nodes: unknown) {
    // Placeholder processing; will be expanded later
    return { success: true, message: 'nodes received', nodes };
  }
}