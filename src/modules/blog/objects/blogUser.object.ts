import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/objects/user.object';

@ObjectType()
export class BlogUser {
  constructor(data: any) {
    this.id = data._id.toString();
    this.title = data.title;
    this.description = data.description;
    this.user = data.user;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => User)
  user: User;
}
