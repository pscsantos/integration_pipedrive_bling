import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private _api = axios.create({
    baseURL: process.env.URL_API_BLING,
  });
  public get api() {
    return this._api;
  }
  public set api(value) {
    this._api = value;
  }
}




