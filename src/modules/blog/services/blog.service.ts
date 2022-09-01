import { Injectable } from '@nestjs/common';
import { CreateBlogInput, CreateBlogToUserInput } from '../dto/create-blog.input';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document, ObjectId } from 'mongodb';
import { Blog } from '../objects/blog.object';
import * as uuid from 'uuid';
import { CreateUserToBlogInput } from 'src/modules/user/dto/create-user.input';

@Injectable()
export class BlogService {
  blogCollection: Collection<Document>;
  userCollection: Collection<Document>;
  constructor(mongoDbService: MongoDbService) {
    this.blogCollection = mongoDbService.db.collection('blog');
    this.userCollection = mongoDbService.db.collection('user');
  }

  async findAll() {
    const data = await this.blogCollection.find().toArray();
    // console.log(data);
    return data.map((entity) => new Blog(entity));
  }

  async create(createBlogInput: CreateBlogInput) {
    const data = {
      ...createBlogInput,
      _id: uuid.v4(),
    };

    await this.blogCollection.insertOne(data);
    return new Blog(data);
  }

  async createBlogUser(createBlogUserInput: CreateBlogToUserInput) {
    const userData = {
      ...createBlogUserInput.user
    };

    const blogData = {
      _id: createBlogUserInput._id,
      title: createBlogUserInput.title,
      description: createBlogUserInput.description,
      userId: createBlogUserInput.user._id
    };
    await this.userCollection.insertOne(userData);
    await this.blogCollection.insertOne(blogData);

    return new Blog(userData);
  }
}
