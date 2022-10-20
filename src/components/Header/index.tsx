import React from 'react';
import Button from '@mui/material/Button';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ADDPOST_ROUTE } from '../../utils/constant';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { logout } from '../../redux/slice/UserSlice';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { data } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  const onClickLogout = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(logout());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to={HOME_ROUTE}>
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {data.token ? (
              <>
                <Link to={ADDPOST_ROUTE}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={LOGIN_ROUTE}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={REGISTER_ROUTE}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
