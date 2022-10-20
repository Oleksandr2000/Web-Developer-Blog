import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { clearStatusPost, createPost, fetchOnePost, updatePost } from '../../redux/slice/PostSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { callToast } from '../../redux/slice/ToastsSlise';
import Toast from '../../components/RequestHandler/Toast';
import { useLocation, useParams } from 'react-router-dom';

export const AddPost = () => {
  const [img, setImg] = React.useState<any>();
  const [text, setText] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const inputFileRef = React.useRef<any>(null);

  const { id } = useParams();

  const location = useLocation();

  const { statusPOST, items, status } = useAppSelector((store) => store.posts.post);

  const isSucces = useAppSelector((store) => store.posts.post.statusPOST) === 'loaded';
  const isError = useAppSelector((store) => store.posts.post.statusPOST) === 'error';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (location.pathname === `/edit/${id}`) {
      dispatch(fetchOnePost({ id: id }));
    }
  }, []);

  React.useEffect(() => {
    if (location.pathname === `/edit/${id}` && status === 'loaded') {
      setTitle(items.doc.title);
      setText(items.doc.text);
      setTags(items.doc.tags.join(', '));
      setImg(null);
    }
  }, [status]);

  React.useEffect(() => {
    if (location.pathname === '/add') {
      setTitle('');
      setText('');
      setTags('');
      setImg(null);
    }
  }, [location]);

  React.useEffect(() => {
    if (isSucces) {
      dispatch(callToast({ show: isSucces, message: 'Succes', saverity: 'success' }));
    }
    if (isError) {
      dispatch(callToast({ show: isError, message: 'Try again later', saverity: 'error' }));
    }
  }, [statusPOST]);

  const handleChangeFile = async (event: any) => {
    setImg(event.target.files[0]);
  };
  const onClickRemoveImage = () => {
    setImg(null);
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async (submitFunction: (body: any) => any, postId?: any) => {
    if (title && text && img && tags) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('tags', tags);
      formData.append('img', img);
      if (postId) {
        formData.append('postId', postId);
      }
      await dispatch(submitFunction(formData));
      dispatch(clearStatusPost());
    } else {
      dispatch(callToast({ show: true, message: 'Invalid Data', saverity: 'error' }));
    }
  };

  const options: any = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '100px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (location.pathname !== '/add') {
    if (!status || status === 'loading') {
      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img src="/duoloader.svg" alt="loadding" />;
        </div>
      );
    }
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="medium"
        className={styles.btn_upload}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {img && (
        <Button variant="contained" size="medium" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {img && <img className={styles.image} src={URL.createObjectURL(img)} alt="Uploaded" />}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        fullWidth
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button
          size="medium"
          onClick={
            location.pathname === '/add'
              ? () => onSubmit(createPost)
              : () => onSubmit(updatePost, id)
          }
          variant="contained">
          {location.pathname === '/add' ? 'Опубликовать' : 'Обновить'}
        </Button>
        <a href="/">
          <Button size="medium">Отмена</Button>
        </a>
      </div>
      <Toast />
    </Paper>
  );
};
