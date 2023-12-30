import { Test, TestingModule } from '@nestjs/testing';
import { UserMoviesController } from './user-movies.controller';
import { UserMoviesService } from './user-movies.service';

describe('UserMoviesController', () => {
  let controller: UserMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMoviesController],
      providers: [UserMoviesService],
    }).compile();

    controller = module.get<UserMoviesController>(UserMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
