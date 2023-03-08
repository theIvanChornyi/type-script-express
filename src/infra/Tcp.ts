import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { IService } from '../types/services';
import { controllers } from '../app/domain';

export class Tcp implements IService {
  private static instanse: Tcp;

  private routePrefix = '/api';
  public server = express();

  constructor() {
    if (!Tcp.instanse) {
      Tcp.instanse = this;
    }
    return Tcp.instanse;
  }
  public async init() {
    const { server, routePrefix } = this;
    useExpressServer(server, {
      routePrefix,
      controllers,
      cors: true,
      defaultErrorHandler: true,
    });
    return new Promise<boolean>((resolve: any) =>
      server.listen(4000, () => {
        console.log('TCP started on port 4000');
        return resolve(true);
      })
    );
  }
}
