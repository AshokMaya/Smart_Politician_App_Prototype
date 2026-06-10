import {createContext} from 'react';

export const defaultUserValues = {
  userName: '',
  authToken: '',
  userEmail: '',
  profileUrl: '',
  language: 'en',
};

const userContextValues = {
  ...defaultUserValues,
  setUser: () => {},
  setShowLoader: () => {},
};

export const UserContext = createContext(userContextValues);
