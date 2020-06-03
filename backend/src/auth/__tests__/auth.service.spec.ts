import { AuthService } from '../auth.service';

let authService: AuthService;

jest.mock('../authenticationProviders/gitlab', () => {
  return { generateAccessToken: jest.fn().mockReturnValue(Promise.resolve('gitlab')) };
});

jest.mock('../authenticationProviders/github', () => {
  return { generateAccessToken: jest.fn().mockReturnValue(Promise.resolve('github')) };
});

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService();
  });
  describe('[Method] generateAccessToken', async () => {
    const code = 'code';

    it('throw an error if incorrect provider is given', () => {
      // @ts-ignore
      expect(authService.generateAccessToken(code, 'fake provider')).rejects.toEqual(
        new Error('UNKNOW_PROVIDER'),
      );
    });

    it('call gitlab function when gitlab provider is given', async () => {
      const token = await authService.generateAccessToken(code, 'gitlab');
      expect(token).toBe('gitlab');
    });

    it('call github function when github provider is given', async () => {
      const token = await authService.generateAccessToken(code, 'github');
      expect(token).toBe('github');
    });
  });
});
