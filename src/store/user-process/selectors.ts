import { NameSpace, AuthorizationStatus } from 'consts';
import { State } from 'types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: State) => state[NameSpace.User].userData;
