import { Controller, Post } from '@nestjs/common';
import { PipedriveService } from '../services/pipedrive.service';

@Controller('pipedrive')
export class PipedriveController {
  constructor(public pipedriveService: PipedriveService) {}

  @Post('integrations/bling')
  async integrationsBling() {

    try {
      const integration = await this.pipedriveService.integrationsPipedriveBling();
      return integration;
    } catch (error) {
      return error;
    }    
  }

}
