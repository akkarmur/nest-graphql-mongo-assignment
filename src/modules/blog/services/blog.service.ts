import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from '../dto/create-blog.input';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document } from 'mongodb';
import { Blog } from '../objects/blog.object';
import * as uuid from 'uuid';
import { User } from 'src/modules/user/objects/user.object';

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
    return data.map((entity) => new Blog(entity));
  }

  async findBlogUser() {
    const blog = await this.blogCollection.find().toArray();
    const user = await this.userCollection.find().toArray();

    const response = [];
    blog.forEach((bItem) => {
      user.forEach((uItem) => {
        if (uItem._id === bItem.userId) {
          response.push({
            ...new Blog(bItem),
            user: new User(uItem),
          });
        }
      });
    });
    return response;
  }

  async findUserBlogs(id) {
    const blog = await this.blogCollection.find({ userId: id }).toArray();
    const user = await this.userCollection.find({ _id: id }).toArray();

    const response = [];
    user.forEach((uItem) => {
      response.push({
        ...new User(uItem),
        blogs: blog?.map((entity) => {
          delete entity['userId'];
          return new Blog(entity);
        }),
      });
    });
    return response;
  }

  async create(createBlogInput: CreateBlogInput) {
    const data = {
      ...createBlogInput,
      _id: uuid.v4(),
    };

    await this.blogCollection.insertOne(data);
    return new Blog(data);
  }

  async deleteBlog(id: string) {
    const data = await this.blogCollection.findOne({ _id: id });
    await this.blogCollection.deleteOne({ _id: id });
    return new Blog(data);
  }
}
