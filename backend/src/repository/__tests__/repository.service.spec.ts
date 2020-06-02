import { RepositoryService } from '../repository.service';
import { CommentService } from '../../comment/comment.service';

let repositoryService: RepositoryService;

const mockedCheckIfCommentsExistForRepository = jest
  .fn()
  .mockImplementation((id: string) => id === 'idWithExistingComments');

describe('Repository Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedCommentService = {
      checkIfCommentsExistForRepository: mockedCheckIfCommentsExistForRepository,
    };
    repositoryService = new RepositoryService((mockedCommentService as unknown) as CommentService);
  });
  describe('[Method] getUserCommentedRepositories', () => {
    it('should return an empty list if no providerRepositories are provided', async () => {
      const providerRepositories: any[] = [];
      const userCommentedRepositories = await repositoryService.getUserCommentedRepositories(
        providerRepositories,
      );
      expect(userCommentedRepositories).toEqual([]);
    });
    it('should return an empty list if provided repositories is null', async () => {
      const providerRepositories: any[] = null;
      const userCommentedRepositories = await repositoryService.getUserCommentedRepositories(
        providerRepositories,
      );
      expect(userCommentedRepositories).toEqual([]);
    });
    it('should return the repositories linked to existing comments in database if there are so', async () => {
      const providerRepositories: any[] = [
        { id: 'idWithExistingComments', name: 'nameWithExistingComments' },
        { id: 'idWithoutExistingComments', name: 'nameWithoutExistingComments' },
      ];

      const expectedFilteredRepositories = [
        { id: 'idWithExistingComments', name: 'nameWithExistingComments' },
      ];

      const userCommentedRepositories = await repositoryService.getUserCommentedRepositories(
        providerRepositories,
      );
      expect(mockedCheckIfCommentsExistForRepository).toHaveBeenCalledTimes(2);
      expect(userCommentedRepositories).toEqual(expectedFilteredRepositories);
    });
    it('should return an empty array if no repository has associated comments', async () => {
      const providerRepositories: any[] = [
        { id: 'idWithoutExistingComments', name: 'nameWithoutExistingComments' },
        { id: 'idWithoutExistingComments2', name: 'nameWithoutExistingComments2' },
      ];

      const expectedFilteredRepositories: any[] = [];

      const userCommentedRepositories = await repositoryService.getUserCommentedRepositories(
        providerRepositories,
      );
      expect(mockedCheckIfCommentsExistForRepository).toHaveBeenCalledTimes(2);
      expect(userCommentedRepositories).toEqual(expectedFilteredRepositories);
    });
  });
});
