import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const addComment = createAsyncThunk<void, any>('comments/addComment', async (params) => {
  const { data } = await axios.post('/comments', params);
  return data;
});

export const fetchComment = createAsyncThunk<any, void>('comments/fetchComments', async () => {
  const { data } = await axios.get('/comments');
  return { data };
});

interface CommentsState {
  comments: any;
  status: string | null;
  statusPOST: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: null,
  statusPOST: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearStatusPost: (state) => {
      state.statusPOST = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addComment.pending, (state) => {
        state.statusPOST = 'loading';
      })
      .addCase(addComment.fulfilled, (state) => {
        state.statusPOST = 'loaded';
      })
      .addCase(addComment.rejected, (state) => {
        state.statusPOST = 'error';
      })
      .addCase(fetchComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.comments = action.payload;
      })
      .addCase(fetchComment.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { clearStatusPost } = commentsSlice.actions;

export default commentsSlice.reducer;
