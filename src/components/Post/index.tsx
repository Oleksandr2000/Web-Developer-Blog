import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { Link } from 'react-router-dom';
import { FULLPOST_ROUTE, UPDATEPOST_ROUTE } from '../../utils/constant';
import { useAppDispatch } from '../../hooks/useContextHooks';
import { removePost } from '../../redux/slice/PostSlice';

interface PostProps {
  _id: any;
  title: string;
  createdAt: string;
  img: string;
  user: any;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  children?: any;
  isFullPost?: boolean;
  isEditable?: boolean;
}

export const Post: React.FC<PostProps> = ({
  _id,
  title,
  createdAt,
  img,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const onClickRemove = () => {
    if (window.confirm('You are sure about this action?')) {
      dispatch(removePost({ id: _id }));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`${UPDATEPOST_ROUTE}/${_id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {img && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={img}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`${FULLPOST_ROUTE}/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
