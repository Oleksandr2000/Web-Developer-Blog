import { Button, InputAdornment, TextField } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';

import styles from './SearchPanel.module.scss';
import {
  fetchPosts,
  resetFilter,
  setPage,
  setSearchString,
  setUser,
} from '../../redux/slice/PostSlice';
import BasicSelect from '../Select';

const SearchPanel = () => {
  const { activeTag, searchString, user, sort, page, limit } = useAppSelector(
    (store) => store.posts,
  );
  const { userData } = useAppSelector((store) => store.user.data);

  const dispatch = useAppDispatch();

  const setSearchValue = async (value: string) => {
    dispatch(setSearchString(value));
  };

  const searchPosts = () => {
    dispatch(setPage(1));
    dispatch(fetchPosts({ tag: activeTag, user, sort, searchString, page, limit }));
  };

  const showMyPost = () => {
    dispatch(setUser(userData._id));
  };

  const resetFilters = () => {
    dispatch(resetFilter());
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.btns}>
          <Button
            variant={!user ? 'contained' : 'outlined'}
            size="medium"
            className={styles.btn}
            onClick={resetFilters}>
            All
          </Button>
          <Button
            variant={user ? 'contained' : 'outlined'}
            size="medium"
            className={styles.btn}
            onClick={showMyPost}>
            My Posts
          </Button>
          <BasicSelect
            items={[
              { value: 'viewsCount', name: 'Popular' },
              { value: 'createdAt', name: 'New' },
            ]}
          />
        </div>
        <div className={styles.input}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            size="small"
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
        </div>
        <div className={styles.user}>
          <Button variant="outlined" size="medium">
            <PeopleAltOutlinedIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
