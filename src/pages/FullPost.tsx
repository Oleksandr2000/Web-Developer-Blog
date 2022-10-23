import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useContextHooks';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { fetchOnePost } from '../redux/slice/PostSlice';
import { CommentsBlock } from '../components/CommentsBlock';
import { Index } from '../components/AddComment';

export const FullPost = () => {
  const { post, status } = useAppSelector((store) => store.posts);
  const { data } = useAppSelector((store) => store.user);
  const isAddComent = useAppSelector((store) => store.comments.statusPOST) === 'loaded';

  const isPostLoading = useAppSelector((store) => store.posts.post.status) === 'loading';

  const { id } = useParams();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchOnePost({ id: id }));
  }, [isAddComent]);

  if (!post.status || isPostLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src="/duoloader.svg" alt="loadding" />
      </div>
    );
  }

  return (
    <>
      <Post
        _id={post.items.doc._id}
        title={post.items.doc.title}
        img={`https://webdeveloperblog.herokuapp.com/${post.items.doc.img}`}
        user={{
          avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
          fullName: post.items.doc.user.fullName,
        }}
        createdAt={post.items.doc.createdAt.substring(0, 10)}
        viewsCount={post.items.doc.viewsCount}
        commentsCount={3}
        tags={post.items.doc.tags}
        isFullPost>
        <p>{post.items.doc.text}</p>
      </Post>
      <CommentsBlock items={post.items.comments} isLoading={false}>
        {data.token && <Index />}
      </CommentsBlock>
    </>
  );
};
