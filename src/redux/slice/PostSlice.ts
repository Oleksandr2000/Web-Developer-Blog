import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Posts } from '../../types';

export const createPost = createAsyncThunk<any, any>('posts/createPost', async (params) => {
  const { data } = await axios.post('/posts', params);
  return data;
});

export const updatePost = createAsyncThunk<any, any>('posts/updatePost', async (params) => {
  const { data } = await axios.patch('/posts', params);
  return data;
});

export const fetchPosts = createAsyncThunk<any, any>('posts/fetchPosts', async (params) => {
  const { tag } = params;
  const { data } = await axios.get(`/posts/?tag=${tag}`);
  return data;
});

export const fetchOnePost = createAsyncThunk<any, any>('posts/fetchOnePost', async (params) => {
  const { id } = params;
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

export const removePost = createAsyncThunk<void, any>('posts/removePost', async (params) => {
  const { id } = params;
  await axios.delete(`/posts/${id}`);
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

interface PostState {
  items: Posts[];
  status: string | null;
  removeStatus: boolean;
  post: {
    items: {
      doc: Posts;
      comments: any;
    };
    status: string | null;
    statusPOST: string | null;
  };
  activeTag: string;
  tags: {
    data: string[];
    status: string | null;
  };
}

const initialState: PostState = {
  items: [],
  status: null,
  removeStatus: false,
  post: {
    items: {
      doc: {
        _id: '',
        title: '',
        text: '',
        createdAt: '',
        updatedAt: '',
        img: '',
        tags: [],
        viewsCount: 0,
        commentsCount: 0,
        user: null,
      },
      comments: [],
    },
    status: null,
    statusPOST: null,
  },
  activeTag: '',
  tags: {
    data: [],
    status: null,
  },
};

const postSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearStatusPost: (state) => {
      state.post.statusPOST = null;
    },
    setActiveTag: (state, action) => {
      state.activeTag = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createPost.pending, (state) => {
        state.post.statusPOST = 'loading';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.post.statusPOST = 'loaded';
      })
      .addCase(createPost.rejected, (state) => {
        state.post.statusPOST = 'error';
      })
      .addCase(updatePost.pending, (state) => {
        state.post.statusPOST = 'loading';
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.post.statusPOST = 'loaded';
      })
      .addCase(updatePost.rejected, (state) => {
        state.post.statusPOST = 'error';
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchOnePost.pending, (state) => {
        state.post.status = 'loading';
      })
      .addCase(fetchOnePost.fulfilled, (state, action) => {
        state.post.status = 'loaded';
        state.post.items = action.payload;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.post.status = 'error';
      })

      .addCase(fetchTags.pending, (state) => {
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.status = 'loaded';
        state.tags.data = action.payload;
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = 'error';
      })
      .addCase(removePost.pending, (state) => {
        state.removeStatus = false;
      })
      .addCase(removePost.fulfilled, (state) => {
        state.removeStatus = true;
      })
      .addCase(removePost.rejected, (state) => {
        state.removeStatus = false;
      });
  },
});

export const { clearStatusPost, setActiveTag } = postSlice.actions;

export default postSlice.reducer;
