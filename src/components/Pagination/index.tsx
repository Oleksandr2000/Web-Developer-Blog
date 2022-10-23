import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { setPage } from '../../redux/slice/PostSlice';

export default function PaginationRounded() {
  const { page, limit, items } = useAppSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  const countPage = Math.ceil(items.count / limit);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <Stack spacing={2} className={styles.root}>
      <Pagination
        count={countPage}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
