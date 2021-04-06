import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';
import { In, MongoRepository } from 'typeorm';
import { format } from 'date-fns';
import { IntegrationPipedriveBlinq } from '../entities/integration_pipedrive_blinq.entity';
import { PipedriveService } from '../../pipedrive/services/pipedrive.service';

@Injectable()
export class BlingService {
  constructor( 
    @InjectRepository(IntegrationPipedriveBlinq)
    private readonly integrationPipedriveBlinq: MongoRepository<IntegrationPipedriveBlinq>,
    @Inject(forwardRef(() => PipedriveService))
    public pipedriveService: PipedriveService,
  ) {}

  async integration(businesses) {
    try {

      let pipedrive = this.pipedriveService;
      let integratedOrdersIds = [];
      const baseUrl = process.env.URL_API_BLING;
      const apiKey = process.env.KEY_API_BLING; 
      let amountIntegrationNow = 0;    

      let configRequestBling: AxiosRequestConfig = {

        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }

      let requests= [];

      for( const business of businesses) {

        const xml = qs.stringify(this.getXml(business));
        
        requests.push(axios.post(`${baseUrl}/pedido/json&apikey=${apiKey}`,xml,configRequestBling)); 
        
        amountIntegrationNow = amountIntegrationNow+business.value;

        integratedOrdersIds.push(business.id);
        
      }  

      Promise.all(requests).then(async function(values) {
        await pipedrive.businessIntegrateds(integratedOrdersIds);     
      });
    
      const today = format(new Date(),'yyyy-MM-dd');
      
      const collectionFindFilterDate = await this.integrationPipedriveBlinq.findOne(
        {
          where: {
            date: new Date(today)
          }
        }
      );

      if( collectionFindFilterDate ) {
        collectionFindFilterDate.amount = amountIntegrationNow + (collectionFindFilterDate.amount);
        await this.integrationPipedriveBlinq.save(collectionFindFilterDate);
      }else {
        await this.integrationPipedriveBlinq.save({
          amountIntegrationNow,
          date: new Date(today),
        });
      }      

      return {
        message: 'Integração realizada com sucesso.',
        businessIntegrateds: businesses
      };

    } catch (error) {
      return error;
    }
  }

  async consolidated() {
    try {      
      const data = await this.integrationPipedriveBlinq.find();       
      return data;
    } catch (error) {
      return error;
    }
  }

  getXml(business): Object {

    const vlr_unit = business.value/business.products_count;

    let xml = 
    `<?xml version="1.0" encoding="UTF-8"?>
      <pedido>
        <cliente>
            <nome>${business.person_id.name}</nome>
          </cliente>     
        <itens>
          <item>
          <codigo>calcj123</codigo>
            <descricao>Calça jeans infanto</descricao>
            <un>Pç</un>
            <qtde>${business.products_count}</qtde>
            <vlr_unit>${vlr_unit}</vlr_unit>
          </item>
        </itens>
      </pedido>`;

    return {
      xml
    };
  }
}
