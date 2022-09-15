import { Injectable } from '@nestjs/common';

import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document } from 'mongodb';
import { User } from '../objects/user.object';
import * as uuid from 'uuid';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class UserService {
  userCollection: Collection<Document>;
  constructor(mongoDbService: MongoDbService) {
    this.userCollection = mongoDbService.db.collection('user');
  }
  async create(createUserInput: CreateUserInput) {
    const data = {
      ...createUserInput,
      _id: uuid.v4(),
    };

    await this.userCollection.insertOne(data);
    return new User(data);
  }

  async findById(id: string) {
    const data = await this.userCollection.find({ _id: id }).toArray();
    return data.map((entity) => new User(entity));
  }
}
