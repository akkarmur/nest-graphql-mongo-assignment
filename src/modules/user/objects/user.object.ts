import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
    this.email = data.email;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}
