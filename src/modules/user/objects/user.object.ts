import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  constructor(data: any) {
    this.id = data._id;
    this.name = data.name;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
