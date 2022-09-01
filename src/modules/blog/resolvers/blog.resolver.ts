import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from '../services/blog.service';
import { Blog } from '../objects/blog.object';
import { CreateBlogInput, CreateBlogToUserInput } from '../dto/create-blog.input';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  blogs() {
    return this.blogService.findAll();
  }

  @Mutation(() => Blog)
  createBlog(
    @Args('input')
    createBlogInput: CreateBlogInput,
  ) {
    return this.blogService.create(createBlogInput);
  }

  @Mutation(() => Blog)
  createBlogUser(
    @Args('input')
    createBlogUserInput: CreateBlogToUserInput,
  ) {
    return this.blogService.createBlogUser(createBlogUserInput);
  }

  // @TODO: Create mutation for create Blog
  // @TODO: Create a query to get all blogs
  // @TODO: Create a query to get blog by its id
}
