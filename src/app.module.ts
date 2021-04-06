import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';
import { IntegratedsModule } from './integrateds/integrateds.module';

@Module({
  imports: [
    PipedriveModule, 
    BlingModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      entities: [
        __dirname + '/**/entities/*.entity{.ts,.js}',
      ],
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
    ),
    IntegratedsModule    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
