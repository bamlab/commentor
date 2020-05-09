import request from 'superagent';
import { CommentType, PieChartData, BarChartData } from 'redux/Comment';
import { TagType } from 'redux/Tag';
import { RepositoryType } from 'redux/Repository';
import {
  formatFetchedCommentForAppType,
  formatFetchedPieChartDataForAppType,
  formatFetchedBarChartDataForAppType,
} from '../../redux/Comment/comment.adapter';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Client {
  baseUrl: string;
  agent: request.SuperAgentStatic;
  tokenKey: string = 'token';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.agent = request.agent();
    // @ts-ignore
    this.agent.accept('application/json');
    // @ts-ignore
    this.agent.withCredentials();
  }

  async request(method: Method, endpoint: string, data: object | null = null) {
    const url = /^https?:\/\//.test(endpoint) ? endpoint : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    if (['post', 'put', 'patch', 'delete'].includes(method) && data) {
      promise = promise.send(data);
    }

    const { body } = await promise;
    return body;
  }

  updateToken(token: string) {
    return localStorage.setItem(this.tokenKey, token);
  }

  get(endpoint: string) {
    return this.request('get', endpoint);
  }

  post(endpoint: string, data: object) {
    return this.request('post', endpoint, data);
  }

  put(endpoint: string, data: object, id: number) {
    return this.request('put', `${endpoint}/${id}/update`, data);
  }

  delete(endpoint: string, id: number) {
    return this.request('delete', `${endpoint}/${id}/delete`);
  }

  createAccessToken = async (data: {
    code: string;
    provider: 'gitlab' | 'github';
  }): Promise<void> => {
    await this.post('/auth/accessToken/create', { code: data.code, provider: data.provider });
    return;
  };

  getUser = async (): Promise<{ oAuthLogin: string }> => {
    const user = await this.get('/auth/user');
    return user;
  };

  fetchComments = async (data: {
    repositoryIds: number[];
    startingDate: Date | null;
    endingDate: Date | null;
    requesterIds: string[];
    commentorIds: string[];
    tagCodes: string[];
  }): Promise<CommentType[]> => {
    const result = await this.post('/comments/filtered', data);
    const adaptedResult = formatFetchedCommentForAppType(result);
    return adaptedResult;
  };

  fetchCommentData = async (data: {
    repositoryIds: number[];
    startingDate: Date | null;
    endingDate: Date | null;
    requesterIds: string[];
    commentorIds: string[];
    tagCodes: string[];
    oAuthLogin: string | null;
  }): Promise<{
    comments: CommentType[];
    pieChartData: PieChartData[];
    barChartData: BarChartData[];
  }> => {
    const result = await this.post('/comments/filteredData', data);
    const adaptedResult = {
      pieChartData: formatFetchedPieChartDataForAppType(result.pieChartData),
      barChartData: formatFetchedBarChartDataForAppType(result.barChartData),
      comments: formatFetchedCommentForAppType(result.comments),
    };
    return adaptedResult;
  };

  fetchTags = async (data: object): Promise<TagType[]> => {
    const result = await this.get('/tags');
    return result;
  };

  fetchRepositories = async (data: object): Promise<RepositoryType[]> => {
    const result = await this.get('/repositories');
    return result;
  };

  addTag = async (data: { code: string; description: string; color: string }): Promise<TagType> => {
    const result = await this.post('/tags', data);
    return result;
  };

  deleteTag = async (tagId: number): Promise<number> => {
    const numberOfDeletedTags = await this.delete('/tags', tagId);
    return numberOfDeletedTags;
  };

  updateTag = async (data: {
    tagId: number;
    code: string;
    description: string;
    color: string;
  }): Promise<TagType> => {
    const result = await this.put(
      '/tags',
      { code: data.code, description: data.description, color: data.color },
      data.tagId,
    );

    return result;
  };

  async logout() {
    const result = await this.post('/auth/accessToken/logout', {});
    return result;
  }
}

const client = new Client(backendBaseUrl);

export default client;
