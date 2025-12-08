import { NameSpace } from 'consts';
import { State } from 'types';

export const getError = (state: State): string | null => state[NameSpace.App].error;
