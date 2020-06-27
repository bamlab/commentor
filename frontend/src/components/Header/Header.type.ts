export interface HeaderPropsType {
  logout: ({}) => void;
  isAuthenticated: boolean;
  isFetchingData: boolean;
  refreshData: () => void;
}
