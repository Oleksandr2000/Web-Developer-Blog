import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

type userResponce = {
  token: string;
  userData: any;
};

export const fetchLogin = createAsyncThunk<any, { email: string; password: string }>(
  'user/fetchLogin',
  async (params) => {
    const { data } = await axios.post('/login', params);
    localStorage.setItem('token', data.token);
    return data;
  },
);

export const fetchRegister = createAsyncThunk<
  userResponce,
  { email: string; password: string; fullName: string }
>('user/fetchRegister', async (params) => {
  const { data } = await axios.post('/registr', params);
  localStorage.setItem('token', data.token);
  return data;
});

export const fetchAuth = createAsyncThunk<userResponce>('user/fetchAuth', async () => {
  const { data } = await axios.get('/auth');

  localStorage.setItem('token', data.token);
  return data;
});

interface UserState {
  data: userResponce;
  status: string;
  statusPOST: string | null;
  errorMessage: any;
}

const initialState: UserState = {
  data: {
    token: '',
    userData: null,
  },
  status: 'loading',
  statusPOST: null,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data.token = '';
      state.data.userData = null;
      localStorage.removeItem('token');
    },
    clearStatusPost: (state) => {
      state.statusPOST = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.statusPOST = 'loaded';
        state.data.token = action.payload.token;
        state.data.userData = action.payload.userData;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchRegister.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.statusPOST = 'loaded';
        state.data.token = action.payload.token;
        state.data.userData = action.payload.userData;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data.token = action.payload.token;
        state.data.userData = action.payload.userData;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { logout, clearStatusPost } = userSlice.actions;

export const selectIsAuth = (state: UserState) => Boolean(state.data.token);

export default userSlice.reducer;
