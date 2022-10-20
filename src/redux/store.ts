import { configureStore } from '@reduxjs/toolkit';
import ToastsSlise from './slice/ToastsSlise';
import UserSlice from './slice/UserSlice';
import PostSlice from './slice/PostSlice';
import CommentsSlice from './slice/CommentsSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    toast: ToastsSlise,
    posts: PostSlice,
    comments: CommentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
