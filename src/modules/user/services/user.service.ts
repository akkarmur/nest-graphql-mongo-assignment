import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  CreateUserToBlogInput,
  UpdateUserInput,
} from '../dto/create-user.input';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document, ObjectId } from 'mongodb';
import { User } from '../objects/user.object';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  userCollection: Collection<Document>;
  blogCollection: Collection<Document>;
  constructor(mongoDbService: MongoDbService) {
    this.userCollection = mongoDbService.db.collection('user');
    this.blogCollection = mongoDbService.db.collection('blog');
  }

  async find(id: string) {
    const data = await this.userCollection.find({ _id: id }).toArray();
    return data.map((entity) => new User(entity));
  }

  async create(createUserInput: CreateUserInput) {
    const data = {
      ...createUserInput,
      _id: uuid.v4(),
    };

    await this.userCollection.insertOne(data);
    return new User(data);
  }

  async updateById(updateUserInput: UpdateUserInput) {
    const data = {
      name: updateUserInput.name,
      email: updateUserInput.email,
    };
    await this.userCollection.findOneAndUpdate(
      { _id: updateUserInput._id },
      { $set: data },
    );
    return new User(data);
  }

  async createUserBlog(createUserBlogInput: CreateUserToBlogInput) {
    const userData = {
      _id: createUserBlogInput._id,
      name: createUserBlogInput.name,
      email: createUserBlogInput.email,
    };

    const blogData = {
      ...createUserBlogInput.blog,
      userId: createUserBlogInput._id,
    };
    await this.userCollection.insertOne(userData);
    await this.blogCollection.insertOne(blogData);

    return new User(userData);
  }
}
