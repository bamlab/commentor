import request from 'superagent';
import { CommentType } from 'redux/Comment';
import { TagType } from 'redux/Tag';
import { RepositoryType } from 'redux/Repository';

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

  createAccessToken = async (code: string): Promise<void> => {
    const result = await this.post('/auth/accessToken/create', { code });
    return result;
  };

  fetchComments = async (data: { repositoryIds: number[] }): Promise<CommentType[]> => {
    const result = await this.post('/comments/filtered', data);
    return result;
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
