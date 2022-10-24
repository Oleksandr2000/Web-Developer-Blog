import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import React from 'react';
import styles from './Hamburger.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ADDPOST_ROUTE } from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { logout } from '../../redux/slice/UserSlice';
import { fetchPosts, setPage, setSearchString } from '../../redux/slice/PostSlice';

const Hamburger = () => {
  const { activeTag, searchString, user, sort, page, limit } = useAppSelector(
    (store) => store.posts,
  );

  const { data } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  const setSearchValue = async (value: string) => {
    dispatch(setSearchString(value));
  };

  const searchPosts = () => {
    dispatch(setPage(1));
    dispatch(fetchPosts({ tag: activeTag, user, sort, searchString, page, limit }));
  };

  const onClickLogout = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(logout());
    }
  };

  return (
    <Accordion className={styles.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        className={styles.summary}
        id="panel1a-header">
        BLOG
      </AccordionSummary>

      <AccordionDetails className={styles.details}>
        <List className={styles.list}>
          <ListItem alignItems="flex-start" className={styles.listItem}>
            <Link to={HOME_ROUTE}>
              <ListItemText primary="Blog" />
            </Link>
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start" className={styles.listItem}>
            {data.token ? (
              <Link to={ADDPOST_ROUTE}>
                <ListItemText primary="Написать статью" />
              </Link>
            ) : (
              <Link to={LOGIN_ROUTE}>
                <ListItemText primary="Войти" />
              </Link>
            )}
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start" className={styles.listItem}>
            {data.token ? (
              <ListItemText primary="Выйти" onClick={onClickLogout} className={styles.logout} />
            ) : (
              <Link to={REGISTER_ROUTE}>
                <ListItemText primary="Создать аккаунт" />
              </Link>
            )}
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start" className={styles.listItem}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              className={styles.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ cursor: 'pointer' }} onClick={searchPosts} />
                  </InputAdornment>
                ),
              }}
              fullWidth
              onChange={(event: any) => setSearchValue(event.target.value)}
            />
          </ListItem>
          <Divider component="li" />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Hamburger;
