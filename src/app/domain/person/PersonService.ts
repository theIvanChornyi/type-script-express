import { nanoid } from 'nanoid';
import { IPerson } from './PersonTypes';

export default class PersonService {
  private data: IPerson[] = [];

  async setPerson(person: IPerson): Promise<string> {
    person.id = nanoid();
    this.data.push(person);
    return 'Person added';
  }

  async getPerson(id: IPerson['id']): Promise<IPerson | undefined> {
    return this.data.find(item => item.id === id);
  }

  async getAllPersons(): Promise<IPerson[]> {
    return this.data;
  }

  async deletePerson(id: IPerson['id']): Promise<boolean> {
    const idx = this.data.findIndex(item => item.id === id);
    if (idx < 0) {
      return false;
    } else {
      this.data.splice(idx, 1);
      return true;
    }
  }
}
