import jwt_decode from 'jwt-decode';
import request from 'superagent';
import { CommentType } from 'redux/Comment';
import { TagType } from 'redux/Tag';
import { RepositoryType } from 'redux/Repository';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

interface AccessToken {
  exp: number;
}

function tokenHasExpired(token: AccessToken): boolean {
  if (!token.exp) return true;

  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;
  return token.exp - now < 10;
}

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

  async request(
    method: Method,
    endpoint: string,
    data: object | null = null,
    checkToken: boolean = true,
  ) {
    // Checking token validity, refreshing it if necessary.
    if (checkToken) await this.checkToken();

    const url = /^https?:\/\//.test(endpoint) ? endpoint : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    const token = this.getToken();
    if (token) {
      promise = promise.set('Authorization', `Bearer ${token}`);
    }

    if (['post', 'put', 'patch', 'delete'].includes(method) && data) {
      promise = promise.send(data);
    }

    const { body } = await promise;
    return body;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  updateToken(token: string) {
    return localStorage.setItem(this.tokenKey, token);
  }

  /**
   * This function assess the access token is still valid, if not it refreshes it.
   * In case of error during the refresh process it disconnects the user and redirects to the login page.
   */
  async checkToken() {
    const token = this.getToken();

    // There was no token to begin with, nothing to check.
    if (!token) return;

    const parsedToken = jwt_decode<AccessToken>(token);
    if (tokenHasExpired(parsedToken)) {
      try {
        await this.refreshToken();
      } catch (e) {
        // Token was invalid, logging out the user.
        this.updateToken('');
        // LOGOUT
      }
    }
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

  async login(data: object) {
    const result = await this.post('/auth/jwt/create', data);
    const token: string | undefined = result.token || result.access;
    if (token) this.updateToken(token);
    return token;
  }

  fetchComments = async (data: { repositoryIds: number[] }): Promise<CommentType[]> => {
    const result = await this.post('/comments/filtered', data);
    return result;
  };

  fetchTags = async (data: object): Promise<TagType[]> => {
    const result = await this.get('/tags');
    return result;
  };

  fetchRepositories = async (data: object): Promise<RepositoryType[]> => {
    // to change
    const result = await this.get('/projects/repositoryIds');
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
    const result = await this.post('/auth/jwt/logout', {});
    return result;
  }

  async refreshToken() {
    const { access } = await this.request('post', '/auth/jwt/refresh', {}, false);
    this.updateToken(access);
  }
}

const client = new Client(backendBaseUrl);

export default client;
