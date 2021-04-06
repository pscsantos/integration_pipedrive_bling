import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipedriveController } from './controller/pipedrive.controller';
import { PipedriveService } from './services/pipedrive.service';
import { BlingModule } from '../bling/bling.module';
import { Integrateds } from './entities/integrated.entity';


@Module({
  imports: [
    forwardRef(() => BlingModule),
    TypeOrmModule.forFeature([Integrateds])
  ],
  controllers: [PipedriveController],
  providers: [PipedriveService],
  exports: [
    PipedriveService,
  ]
})
export class PipedriveModule {}
