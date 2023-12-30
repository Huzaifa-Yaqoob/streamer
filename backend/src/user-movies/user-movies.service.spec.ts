import { Test, TestingModule } from '@nestjs/testing';
import { UserMoviesService } from './user-movies.service';

describe('UserMoviesService', () => {
  let service: UserMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMoviesService],
    }).compile();

    service = module.get<UserMoviesService>(UserMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
