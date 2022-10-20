import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { addComment, clearStatusPost } from '../../redux/slice/CommentsSlice';
import Toast from '../RequestHandler/Toast';
import { callToast } from '../../redux/slice/ToastsSlise';

export const Index = () => {
  const { data } = useAppSelector((store) => store.user);
  const { _id } = useAppSelector((store) => store.posts.post.items.doc);
  const { statusPOST } = useAppSelector((store) => store.comments);

  const isSucces = useAppSelector((store) => store.comments.statusPOST) === 'loaded';
  const isError = useAppSelector((store) => store.comments.statusPOST) === 'error';

  const [commentsBody, setCommentsBody] = React.useState<string>('');

  const comments = {
    postId: _id,
    userName: data.userData.fullName,
    content: commentsBody,
  };

  const dispatch = useAppDispatch();

  const onChange = (value: string) => {
    setCommentsBody(value);
  };

  const onSubmit = async () => {
    await dispatch(addComment(comments));
    dispatch(clearStatusPost());
    setCommentsBody('');
  };

  React.useEffect(() => {
    if (isSucces) {
      dispatch(callToast({ show: isSucces, message: 'Succes', saverity: 'success' }));
    }
    if (isError) {
      dispatch(callToast({ show: isError, message: 'Try again later', saverity: 'error' }));
    }
  }, [statusPOST]);

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentsBody}
            onChange={(e) => onChange(e.target.value)}
          />
          <Button type="submit" variant="contained" onClick={onSubmit}>
            Отправить
          </Button>
        </div>
      </div>
      <Toast />
    </>
  );
};
