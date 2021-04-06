import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { MongoRepository } from 'typeorm';
import { Integrateds } from '../entities/integrated.entity';
import { BlingService } from '../../bling/services/bling.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PipedriveService {
  constructor(
    @Inject(forwardRef(() => BlingService))
    public blingService: BlingService,
    @InjectRepository(Integrateds)
    private readonly integrateds: MongoRepository<Integrateds>
    ) {}

  async integrationsPipedriveBling() {
    try {

      const urlPipedriveDeals = `${process.env.URL_API_PIPEDRIVE}/deals?api_token=${process.env.KEY_API_PIPEDRIVE}&status=won&limit=100&sort=update_time%20DESC`;     
      const { data: response } = await axios.get(urlPipedriveDeals);
      let { data: businesses } = response;

      let businessFor = [];      
      businessFor = [businessFor,...businesses];

      for( const business of businessFor) { 
        const exist = await this.integrateds.findOne({
          where: {
            businessId : business.id
          }
        });
        if(exist) {
          const index = businesses.findIndex(item => item.id === business.id);
          businesses.splice(index,1);
        }
      }
    
      if(businesses.length > 0) {
        const integrationBling = await this.blingService.integration(businesses);
        return integrationBling;
      }

       return {
        message: 'Nenhum novo negócio a ser integrado!'
      }      

    } catch (error) {
      return error;
    }       
  }

  async businessIntegrateds(businessIds: number[] ) {
    try {
      for( const businessId of businessIds) {
        await this.integrateds.save({
          businessId
        });
      }    
      const integratedBusinesses = await this.integrateds.find();
      return integratedBusinesses;
    } catch (error) {
      return error;
    } 
  }
}
