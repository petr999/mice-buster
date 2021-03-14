import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {MouseDataSource} from '../datasources';

export type Mouse = {
  id: number;
  date: string;
  delay: number;
}
export class Response {
  status: number;
  body: Mouse;
}

export interface MouseService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  lure(params: object): Promise<Response>;
}

export class MouseServiceProvider implements Provider<MouseService> {
  constructor(
    // mouse must match the name property in the datasource json file
    @inject('datasources.mouse')
    protected dataSource: MouseDataSource = new MouseDataSource(),
  ) { }

  value(): Promise<MouseService> {
    return getService(this.dataSource);
  }
}
