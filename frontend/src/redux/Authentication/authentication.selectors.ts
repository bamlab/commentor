import { RootState } from 'redux/types';

export const isAuthenticated = (store: RootState) => store.authentication.isAuthenticated;

export const isAuthenticationLoading = (store: RootState) => store.authentication.isLoading;

export const getUser = (store: RootState) => store.authentication.user;
