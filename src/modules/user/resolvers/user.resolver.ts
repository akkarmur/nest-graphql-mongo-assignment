import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../objects/user.object';
import { CreateUserInput, CreateUserToBlogInput, UpdateUserInput } from '../dto/create-user.input';
import { CreateBlogInput } from 'src/modules/blog/dto/create-blog.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}


  @Query(() => [User])
  users(@Args('id') id: string) {
    return this.userService.find(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('input')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUserById(
    @Args('input')
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateById(updateUserInput);
  }


  @Mutation(() => User)
  createUserBlog(
    @Args('input')
    createUserBlogInput: CreateUserToBlogInput,
  ) {
    return this.userService.createUserBlog(createUserBlogInput);
  }

  // @TODO: Create mutation for create Blog
  // @TODO: Create a query to get all blogs
  // @TODO: Create a query to get blog by its id
}
