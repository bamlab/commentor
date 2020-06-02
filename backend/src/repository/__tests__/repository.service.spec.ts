import { RepositoryService } from '../repository.service';
import { CommentService } from '../../comment/comment.service';

let repositoryService: RepositoryService;

describe('Repository Service', () => {
  beforeAll(() => {
    const mockedCommentService = {
      checkIfCommentsExistForRepository: jest.fn(),
    };
    repositoryService = new RepositoryService((mockedCommentService as unknown) as CommentService);
  });
  describe('[Method] getUserCommentedRepositories', () => {
    it('should return an empty list if no providerRepositories are provided', async () => {
      const userCommentedRepositories = await repositoryService.getUserCommentedRepositories([]);
      expect(userCommentedRepositories).toEqual([]);
    });
    it('should return the repositories linked to existing comments in database', () => {});
  });
});
