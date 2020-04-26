import { CommentType } from '../../redux/Comment';
import { TagType } from '../../redux/Tag';
import { TagsOverTimeType } from '../../redux/GraphData';

export const getMockedComments = (): Promise<CommentType[]> =>
  new Promise(resolve => setTimeout(() => resolve(MockedComment), 1000));

/**
 * Mocked comment if, for "example", you [could not/don't want to] connect to backend
 * @requires mockedComments
 */
export const MockedComment: CommentType[] = [
  {
    id: 123,
    body: ' ♻️ ewffew',
    filePath: 'fefwf',
    url: 'ffew',
    commentor: 'amauryw',
    requester: 'maximes',
    pullRequestUrl: 'fewfw',
    repositoryId: 1233,
    creationDate: new Date(),
  },
  {
    id: 12,
    body: 'ewffew',
    filePath: 'fefwf',
    url: 'ffew',
    commentor: 'maximes',
    requester: 'maximes',
    pullRequestUrl: 'fewfw',
    repositoryId: 1233,
    creationDate: new Date(),
  },
  {
    id: 1233,
    body: ' 🔥 ewffew',
    filePath: 'fefwf',
    url: 'ffew',
    commentor: 'maximes',
    requester: 'amauryw',
    pullRequestUrl: 'fewfw',
    repositoryId: 1233,
    creationDate: new Date(),
  },
  {
    id: 1233,
    body: ' 🎗 ewffew',
    filePath: 'fefwf',
    url: 'ffew',
    commentor: 'maximes21',
    requester: 'amauryw12',
    pullRequestUrl: 'fewfw',
    repositoryId: 1233,
    creationDate: new Date(),
  },
];

export const getMockedValues = <T>(values: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(values), 2000));

export const MockedTags: TagType[] = [
  {
    id: 12,
    code: '♻️',
    color: 'red',
    description: 'refacto',
    creationDate: new Date(),
    githubLogin: 'amauryw',
    isDefault: true,
  },
  {
    id: 13,
    code: '🔥',
    color: 'blue',
    description: 'my description',
    creationDate: new Date(),
    githubLogin: 'amauryw',
    isDefault: false,
  },
  {
    id: 23,
    code: '🎗',
    color: 'white',
    description: 'my description',
    creationDate: new Date(),
    githubLogin: null,
    isDefault: false,
  },
];

export const MockedTagsOverTime: TagsOverTimeType = [
  {
    '2014-05-12T00:00:00.000Z': {
      '✅': 12,
      '♻️': 15,
    },
    '2014-07-12T00:00:00.000Z': {
      '📦': 12,
      '♻️': 15,
      '⚠️': 19,
      '🍍': 9,
      test: 2,
    },
    '2014-02-24T00:00:00.000Z': {
      '✅': 12,
      refacto: 15,
    },
    '2014-05-23T00:00:00.000Z': {
      '✅': 12,
      '🏗': 15,
    },
  },
];
