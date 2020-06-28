export type LoginPropsType = {
  login: (code: string, provider: string) => void;
  isAuthenticated: boolean;
  location: { search: string };
};
