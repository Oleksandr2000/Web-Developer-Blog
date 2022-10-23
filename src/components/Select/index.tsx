import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../hooks/useContextHooks';
import { setSort } from '../../redux/slice/PostSlice';

import styles from './Select.module.scss';

interface BasicSelectProps {
  items: { name: string; value: string }[];
}
const BasicSelect: React.FC<BasicSelectProps> = ({ items }) => {
  const { sort } = useAppSelector((store) => store.posts);

  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setSort(value));
  };

  return (
    <>
      <FormControl style={{ width: 120 }} size="small" className={styles.select}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort"
          onChange={(e: any) => handleChange(e.target.value)}>
          {items.map((obj, i) => (
            <MenuItem key={i} value={obj.value}>
              {obj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default BasicSelect;
