import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { CommentService } from '../comment.service';
import {
  tagCodesCommentQueryDecorator,
  repositoriesIdsFilterCommentQueryDecorator,
  requesterIdsCommentQueryDecorator,
  dateFilterCommentQueryDecorator,
  commentorIdsCommentQueryDecorator,
} from '../comment.decorator';

let commentService: CommentService;

const query = {
  orderBy: jest.fn(),
  getMany: jest.fn(),
};

const mockedCommentRepository: {
  update: Function;
  delete: Function;
  save: Function;
  createQueryBuilder: Function;
  findOne: Function;
  metadata: { columns: any[]; relations: any[] };
} = {
  update: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue(query),
  findOne: jest.fn(),
  metadata: { columns: [], relations: [] },
};

jest.mock('../comment.decorator', () => {
  return {
    __esModule: true,
    repositoriesIdsFilterCommentQueryDecorator: jest.fn(),
    dateFilterCommentQueryDecorator: jest.fn(),
    requesterIdsCommentQueryDecorator: jest.fn(),
    commentorIdsCommentQueryDecorator: jest.fn(),
    tagCodesCommentQueryDecorator: jest.fn(),
  };
});

const repositoriesIds = [789, 123];
const startingDate = new Date('2020-01-01T11:00:00.000Z');
const endingDate = new Date('2021-06-03T10:00:00.000Z');
const requesterIds = ['Hello', 'world'];
const commentorIds = ['My', 'name', 'is', 'Brian'];
const tagCodes = ['Tag1', 'Tag2'];
const comment: Pick<
  Comment,
  'body' | 'filePath' | 'url' | 'commentor' | 'requester' | 'pullRequestUrl' | 'repositoryId'
> = {
  body: 'body',
  filePath: 'filePath',
  url: 'url',
  commentor: 'commentor',
  requester: 'requester',
  pullRequestUrl: 'pullRequestUrl',
  repositoryId: 1,
};

describe('Comment Service', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
    commentService = new CommentService(mockedCommentRepository as Repository<Comment>);
  });
  describe('[Method] receiveCommentEvent', () => {
    it("if action === 'edited', should call commentRepository.update", async () => {
      await commentService.receiveCommentEvent({ action: 'edited', comment });
      expect(mockedCommentRepository.update).toHaveBeenCalledTimes(1);
      expect(mockedCommentRepository.update).toHaveBeenCalledWith(
        { url: comment.url },
        { body: comment.body },
      );
    });
    it("if action === 'deleted', should call commentRepository.delete", async () => {
      await commentService.receiveCommentEvent({ action: 'deleted', comment });
      expect(mockedCommentRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockedCommentRepository.delete).toHaveBeenCalledWith({ url: comment.url });
    });
    it("if action === 'created', should call commentRepository.save", async () => {
      await commentService.receiveCommentEvent({ action: 'created', comment });
      expect(mockedCommentRepository.save).toHaveBeenCalledTimes(1);
      expect(mockedCommentRepository.save).toHaveBeenCalledWith(comment);
    });
  });
  describe('[Method] getCommentsWithFilters', async () => {
    beforeAll(async () => {
      await commentService.getCommentsWithFilters({
        repositoriesIds,
        startingDate,
        endingDate,
        requesterIds,
        commentorIds,
        tagCodes,
      });
    });
    it('should filter the comments by repository ids', () => {
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledWith(
        query,
        repositoriesIds,
      );
    });
    it('should filter the comments by date', () => {
      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledWith(query, startingDate, endingDate);
    });

    it('should filter the comments by requesters', () => {
      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledWith(query, requesterIds);
    });

    it('should filter the comments by reviewers', () => {
      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledWith(query, commentorIds);
    });

    it('should filter the comments by tags', () => {
      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledWith(query, tagCodes);
    });

    it('should order the comments by creation date in descending order', () => {
      expect(query.orderBy).toHaveBeenCalledTimes(1);
      expect(query.orderBy).toHaveBeenCalledWith('comments.creationDate', 'DESC');
    });

    it('should execute the query with a get many', () => {
      expect(query.getMany).toHaveBeenCalledTimes(1);
    });
  });
  describe('[Method] checkIfCommentsExistForRepository', () => {
    it('should call commentRepository.findOne', async () => {
      const repositoryId = 1;
      await commentService.checkIfCommentsExistForRepository(repositoryId);
      expect(mockedCommentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockedCommentRepository.findOne).toHaveBeenCalledWith({
        where: { repositoryId },
      });
    });
  });
});
