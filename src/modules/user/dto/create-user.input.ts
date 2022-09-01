import { InputType, Field } from '@nestjs/graphql';
import { CreateBlogInput, UpdateBlogInput } from 'src/modules/blog/dto/create-blog.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  _id: any;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class CreateUserToBlogInput {
   @Field(() => String)
  _id: any;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => UpdateBlogInput)
  blog: UpdateBlogInput
}
