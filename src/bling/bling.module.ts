import { forwardRef, Module } from '@nestjs/common';
import { BlingController } from './controller/blinq.controller';
import { BlingService } from './services/bling.service';
import { IntegrationPipedriveBlinq } from './entities/integration_pipedrive_blinq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipedriveModule } from '../pipedrive/pipedrive.module';

@Module({
  imports: [
    forwardRef(() => PipedriveModule),
    TypeOrmModule.forFeature([IntegrationPipedriveBlinq])
  ],
  controllers: [BlingController],
  providers: [BlingService],
  exports: [BlingService]
})
export class BlingModule {}
