import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from '../services/blog.service';
import { Blog } from '../objects/blog.object';
import { CreateBlogInput } from '../dto/create-blog.input';
import { BlogUser } from '../objects/blogUser.object';
import { UserBlog } from '../objects/userBlogs.object';

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

  @Query(() => [BlogUser])
  blogsUser() {
    return this.blogService.findBlogUser();
  }

  @Query(() => [UserBlog])
  userBlog(
    @Args('id')
    id: string,
  ) {
    return this.blogService.findUserBlogs(id);
  }

  @Mutation(() => Blog)
  deleteBlog(
    @Args('id')
    id: string,
  ) {
    return this.blogService.deleteBlog(id);
  }

  // @TODO: Create mutation for create Blog
  // @TODO: Create a query to get all blogs
  // @TODO: Create a query to get blog by its id
}
