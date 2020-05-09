export type LoginPropsType = {
  login: (code: string, provider: 'github' | 'gitlab') => void;
  isAuthenticated: boolean;
  location: { search: string };
};
