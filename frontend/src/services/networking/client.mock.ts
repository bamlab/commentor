import { CommentType } from '../../redux/Comment';
import { TagType } from '../../redux/Tag';

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

export const getMockedTags = (): Promise<TagType[]> =>
  new Promise(resolve => setTimeout(() => resolve(MockedTags), 2000));

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
