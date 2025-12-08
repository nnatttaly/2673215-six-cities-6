import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';

type AppProcess = {
  error: string | null;
};

const initialState: AppProcess = {
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = appProcess.actions;
