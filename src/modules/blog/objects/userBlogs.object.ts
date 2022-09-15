import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from './blog.object';

@ObjectType()
export class UserBlog {
  constructor(data: any) {
    this.id = data._id.toString();
    this.name = data.title;
    this.blogs = data.blogs;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Blog])
  blogs: Blog[];
}
