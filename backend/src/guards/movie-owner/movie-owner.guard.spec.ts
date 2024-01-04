import { MovieOwnerGuard } from './movie-owner.guard';

describe('MovieOwnerGuard', () => {
  it('should be defined', () => {
    expect(new MovieOwnerGuard()).toBeDefined();
  });
});
