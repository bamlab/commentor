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
  getMany: jest.fn().mockImplementation(() => Promise.resolve('Hello')),
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

describe('Comment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    commentService = new CommentService((mockedCommentRepository as unknown) as Repository<
      Comment
    >);
  });
  describe('[Method] getCommentsWithFilters', () => {
    it('should build a query without filter', async () => {
      const repositoriesIds = [123, 456];
      const startingDate = new Date('2019-01-01T11:00:00.000Z');
      const endingDate = new Date('2020-06-03T10:00:00.000Z');
      const returnValue = await commentService.getCommentsWithFilters({
        repositoriesIds,
        startingDate,
        endingDate,
        requesterIds: [],
        commentorIds: [],
        tagCodes: [],
      });
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledWith(
        query,
        repositoriesIds,
      );

      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledWith(query, startingDate, endingDate);

      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledWith(query, []);

      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledWith(query, []);

      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledWith(query, []);

      expect(query.orderBy).toHaveBeenCalledTimes(1);
      expect(query.orderBy).toHaveBeenCalledWith('comments.creationDate', 'DESC');

      expect(returnValue).toBe('Hello');
    });

    it('should build a query with all filters', async () => {
      const repositoriesIds = [789, 123];
      const startingDate = new Date('2020-01-01T11:00:00.000Z');
      const endingDate = new Date('2021-06-03T10:00:00.000Z');
      const requesterIds = ['Hello', 'world'];
      const commentorIds = ['My', 'name', 'is', 'Brian'];
      const tagCodes = ['Tag1', 'Tag2'];
      const returnValue = await commentService.getCommentsWithFilters({
        repositoriesIds,
        startingDate,
        endingDate,
        requesterIds,
        commentorIds,
        tagCodes,
      });
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(repositoriesIdsFilterCommentQueryDecorator).toHaveBeenCalledWith(
        query,
        repositoriesIds,
      );

      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(dateFilterCommentQueryDecorator).toHaveBeenCalledWith(query, startingDate, endingDate);

      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(requesterIdsCommentQueryDecorator).toHaveBeenCalledWith(query, requesterIds);

      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(commentorIdsCommentQueryDecorator).toHaveBeenCalledWith(query, commentorIds);

      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledTimes(1);
      expect(tagCodesCommentQueryDecorator).toHaveBeenCalledWith(query, tagCodes);

      expect(query.orderBy).toHaveBeenCalledTimes(1);
      expect(query.orderBy).toHaveBeenCalledWith('comments.creationDate', 'DESC');

      expect(returnValue).toBe('Hello');
    });
  });
});
