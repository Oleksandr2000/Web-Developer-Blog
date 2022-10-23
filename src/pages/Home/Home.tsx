import React from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import SearchPanel from '../../components/SearchPanel';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { fetchPosts, fetchTags } from '../../redux/slice/PostSlice';
import { PostSkeleton } from '../../components/Post/Skeleton';
import { fetchComment } from '../../redux/slice/CommentsSlice';

import styles from './Home.module.scss';
import PaginationRounded from '../../components/Pagination';

export const Home = () => {
  const { items, status, activeTag, tags, removeStatus, searchString, user, sort, page, limit } =
    useAppSelector((store) => store.posts);
  const { comments } = useAppSelector((store) => store.comments);
  const { data } = useAppSelector((store) => store.user);
  const authStatus = useAppSelector((store) => store.user.status);
  const commentsStatus = useAppSelector((store) => store.comments.status);

  const isPostLoading = useAppSelector((store) => store.posts.status) === 'loading';
  const isTagsLoading = useAppSelector((store) => store.posts.tags.status) === 'loading';
  const isCommentsLoading = useAppSelector((store) => store.comments.status) === 'loading';
  const isEmptySearchString = useAppSelector((store) => store.posts.searchString) === '';

  const isAuthLoading = useAppSelector((store) => store.user.status) === 'loading';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPosts({ tag: activeTag, user, sort, searchString, page, limit }));
  }, [activeTag, removeStatus, user, sort, page]);

  React.useEffect(() => {
    if (isEmptySearchString) {
      dispatch(fetchPosts({ tag: activeTag, user, sort, searchString, page, limit }));
    }
  }, [isEmptySearchString]);

  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);

  React.useEffect(() => {
    dispatch(fetchComment());
  }, []);

  return (
    <>
      <SearchPanel />
      <Grid container spacing={4} className={styles.root}>
        <Grid xs={12} md={8} item className={styles.posts}>
          {!status || isPostLoading || isAuthLoading || !authStatus
            ? [...Array(4)].map((obj: any, index) => <PostSkeleton key={index} />)
            : items.data.map((post: any) => (
                <Post
                  key={post._id}
                  _id={post._id}
                  title={post.title}
                  img={`https://webdeveloperblog.herokuapp.com//${post.img}`}
                  user={{
                    avatarUrl:
                      'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: post.user.fullName,
                  }}
                  createdAt={post.createdAt.substring(0, 10)}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable={data.userData && post.user._id === data.userData._id ? true : false}
                />
              ))}
        </Grid>
        <Grid xs={12} md={4} className={styles.sideblock} item>
          <TagsBlock items={tags.data} isLoading={isTagsLoading || !tags.status ? true : false} />
          <CommentsBlock
            items={comments.data}
            isLoading={isCommentsLoading || !commentsStatus ? true : false}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          <PaginationRounded />
        </Grid>
      </Grid>
    </>
  );
};
