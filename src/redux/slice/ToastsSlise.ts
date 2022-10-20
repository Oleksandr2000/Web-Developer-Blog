import { createSlice } from '@reduxjs/toolkit';

interface ToastsState {
  show: boolean;
  message: string | null;
  saverity: any;
}

const initialState: ToastsState = {
  show: false,
  message: null,
  saverity: null,
};

const userSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    callToast: (state, action) => {
      state.show = action.payload.show;
      state.message = action.payload.message;
      state.saverity = action.payload.saverity;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
  extraReducers: {},
});

export const { callToast, hideToast } = userSlice.actions;

export default userSlice.reducer;
