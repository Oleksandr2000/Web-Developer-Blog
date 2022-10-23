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
  const { tag, sort, user, searchString, page, limit } = params;
  const { data } = await axios.get(
    `/posts/?tag=${tag}&sort=${sort}&user=${user}&searchString=${searchString}&page=${page}&limit=${limit}`,
  );
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
  items: {
    data: Posts[];
    count: number;
  };
  limit: number;
  page: number;
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
  sort: string;
  user: string;
  searchString: string;
  tags: {
    data: string[];
    status: string | null;
  };
}

const initialState: PostState = {
  items: {
    data: [],
    count: 0,
  },
  limit: 3,
  page: 1,
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
  sort: 'viewsCount',
  user: '',
  searchString: '',
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
      if (state.activeTag === action.payload) {
        state.activeTag = '';
      } else {
        state.activeTag = action.payload;
      }
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetFilter: (state) => {
      state.user = '';
    },
    setPage: (state, action) => {
      state.page = action.payload;
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
        state.items.data = action.payload.posts;
        state.items.count = action.payload.count;
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

export const {
  clearStatusPost,
  setActiveTag,
  setSort,
  setSearchString,
  setUser,
  resetFilter,
  setPage,
} = postSlice.actions;

export default postSlice.reducer;
