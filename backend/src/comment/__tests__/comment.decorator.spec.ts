import {
  tagCodesCommentQueryDecorator,
  requesterIdsCommentQueryDecorator,
  commentorIdsCommentQueryDecorator,
} from '../comment.decorator';
import { SelectQueryBuilder } from 'typeorm';
import { Comment } from '../comment.entity';

const query = ({
  andWhere: jest.fn(),
} as unknown) as SelectQueryBuilder<Comment>;

jest.mock('typeorm', () => {
  class ArgumentBracketsFunction {
    argumentsWhere: any[] = [];
    timesWhereHasBeenCalled: number = 0;
    argumentsOrWhere: any[] = [];
    timesOrWhereHasBeenCalled: number = 0;

    where = (...args: any[]) => {
      this.timesWhereHasBeenCalled += 1;
      this.argumentsWhere.push(args);
    };

    orWhere = (...args: any[]) => {
      this.timesOrWhereHasBeenCalled += 1;
      this.argumentsOrWhere.push(args);
    };
  }

  return {
    Brackets: jest.fn().mockImplementation((fn: Function) => {
      const argumentFunction = new ArgumentBracketsFunction();
      fn(argumentFunction);
      return {
        argumentsWhere: argumentFunction.argumentsWhere,
        timesWhereHasBeenCalled: argumentFunction.timesWhereHasBeenCalled,
        argumentsOrWhere: argumentFunction.argumentsOrWhere,
        timesOrWhereHasBeenCalled: argumentFunction.timesOrWhereHasBeenCalled,
      };
    }),
  };
});

describe('Comment decorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('[Method] tagCodesCommentQueryDecorator', () => {
    it('should not call query.andWhere when no tag code is provided', () => {
      tagCodesCommentQueryDecorator(query, []);
      expect(query.andWhere).toHaveBeenCalledTimes(0);
    });

    it('When one tag code is provided, should call query.andWhere with a created bracket which calls argument.where once', () => {
      const tagCodes = ['tag'];
      tagCodesCommentQueryDecorator(query, tagCodes);
      expect(query.andWhere).toHaveBeenCalledTimes(1);
      expect(query.andWhere).toHaveBeenCalledWith({
        argumentsWhere: [[`Comments.body ILIKE '%tag%'`]],
        timesWhereHasBeenCalled: 1,
        argumentsOrWhere: [],
        timesOrWhereHasBeenCalled: 0,
      });
    });

    it('When multiple tag codes are provided, should call query.andWhere with a created bracket which calls argument.where once and argument.orWhere multiple times', () => {
      const tagCodes = ['tag1', 'tag2', 'tag3'];
      tagCodesCommentQueryDecorator(query, tagCodes);
      expect(query.andWhere).toHaveBeenCalledTimes(1);
      expect(query.andWhere).toHaveBeenCalledWith({
        argumentsWhere: [[`Comments.body ILIKE '%tag1%'`]],
        timesWhereHasBeenCalled: 1,
        argumentsOrWhere: [[`Comments.body ILIKE '%tag2%'`], [`Comments.body ILIKE '%tag3%'`]],
        timesOrWhereHasBeenCalled: 2,
      });
    });
  });

  describe('[Method] requesterIdsCommentQueryDecorator', () => {
    it('should not call andWhere when no requester id is provided', () => {
      requesterIdsCommentQueryDecorator(query, []);
      expect(query.andWhere).toHaveBeenCalledTimes(0);
    });

    it('should filter requesters with andWhere when there are requester ids', () => {
      const requesterIds = ['requester1', 'requester2'];
      requesterIdsCommentQueryDecorator(query, requesterIds);

      expect(query.andWhere).toHaveBeenCalledTimes(1);
      expect(query.andWhere).toHaveBeenCalledWith('comments.requester IN (:...requesters)', {
        requesters: requesterIds,
      });
    });
  });

  describe('[Method] commentorIdsCommentQueryDecorator', () => {
    it('should not call andWhere when no commentor id is provided', () => {
      commentorIdsCommentQueryDecorator(query, []);
      expect(query.andWhere).toHaveBeenCalledTimes(0);
    });

    it('should filter commentors with andWhere when there are commentors ids', () => {
      const commentorIds = ['commentor1', 'commentor2'];
      commentorIdsCommentQueryDecorator(query, commentorIds);

      expect(query.andWhere).toHaveBeenCalledTimes(1);
      expect(query.andWhere).toHaveBeenCalledWith('comments.commentor IN (:...commentors)', {
        commentors: commentorIds,
      });
    });
  });
});
