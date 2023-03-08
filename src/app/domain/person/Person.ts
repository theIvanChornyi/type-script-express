import {
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
  OnUndefined,
  Delete,
} from 'routing-controllers';

import { App } from 'infra/App';
import PersonService from './PersonService';
import { IPerson } from './PersonTypes';

@JsonController('/person')
export default class Person {
  public app = new App();
  public personServise = new PersonService();

  @Get()
  async getAllPersons(): Promise<IPerson[]> {
    return await this.personServise.getAllPersons();
  }

  @OnUndefined(404)
  @Get('/:id')
  async getPerson(
    @Param('id') id: IPerson['id']
  ): Promise<IPerson | undefined> {
    return await this.personServise.getPerson(id);
  }

  @Post()
  @HttpCode(201)
  async setPerson(@Body() body: IPerson): Promise<string> {
    return await this.personServise.setPerson(body);
  }

  @HttpCode(204)
  @Delete('/:id')
  async deletePerson(@Param('id') id: IPerson['id']): Promise<boolean> {
    return await this.personServise.deletePerson(id);
  }
}
