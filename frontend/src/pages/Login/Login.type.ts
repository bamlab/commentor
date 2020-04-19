export type LoginPropsType = {
  login: (code: string) => void;
  isAuthenticated: boolean;
  location: { search: string };
};
