import { IService } from '../types/services';
import { Tcp } from './Tcp';

export class App implements IService {
  private static instanse: App;
  private tcp: IService = new Tcp();
  constructor() {
    if (!App.instanse) {
      App.instanse = this;
    }
    return App.instanse;
  }
  async init() {
    console.log('Started');
    return this.tcp.init();
  }
}
