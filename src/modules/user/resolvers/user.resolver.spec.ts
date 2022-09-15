import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from '../services/user.service';

describe(UserResolver.name, () => {
  let userServiceMock: Partial<Record<keyof UserService, jest.Mock>>;
  let resolver: UserResolver;

  beforeEach(async () => {
    userServiceMock = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver],
    })
      .useMocker((token) => {
        switch (token) {
          case UserService:
            return userServiceMock;
        }
        return undefined;
      })
      .compile();

    resolver = module.get(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
