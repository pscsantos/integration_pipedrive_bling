import { Injectable } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class ApiPipedriveService {
  private _api = axios.create({
    baseURL: `${process.env.API_PIPEDRIVE}&${process.env.API_PIPEDRIVE}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  public get api() {
    return this._api;
  }
  public set api(value) {
    this._api = value;
  }

}

