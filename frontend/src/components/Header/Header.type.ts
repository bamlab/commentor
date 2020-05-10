export type HeaderPropsType = {
  logout: ({}) => void;
  isAuthenticated: boolean;
  isFetchingData: boolean;
  refreshData: () => void;
};
