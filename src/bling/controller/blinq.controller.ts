import { Controller, Post, Get } from '@nestjs/common';
import { BlingService } from '../services/bling.service';


@Controller('bling')
export class BlingController {

  constructor(public blingService: BlingService){}

  @Post('orders')
  async orders(business) {
    try {
      const orders = await this.blingService.integration(business);
      return orders;
    } catch (error) {
      return error;
    }
  }

  @Get('integrations/pipedrive')
  async consolidated() {
    try {
      const consolidated = await this.blingService.consolidated();
      return consolidated;
    } catch (error) {
      return error;
    }
  }


}
