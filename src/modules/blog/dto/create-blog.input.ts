import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/modules/user/dto/create-user.input';

@InputType()
export class CreateBlogInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class UpdateBlogInput {
  @Field(() => String)
  _id: any;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}

@InputType()
export class CreateBlogToUserInput {
   @Field(() => String)
  _id: any;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => UpdateUserInput)
  user: UpdateUserInput
}
