import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { useAppDispatch } from '../hooks/useContextHooks';
import { setActiveTag } from '../redux/slice/PostSlice';

interface TagsBlockProps {
  items: any;
  isLoading: boolean;
}

export const TagsBlock: React.FC<TagsBlockProps> = ({ items, isLoading = true }) => {
  const dispatch = useAppDispatch();

  const handlerTag = (tag: string) => {
    dispatch(setActiveTag(tag));
  };

  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name: any, i: number) => (
          <div
            key={i}
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={() => handlerTag(name)}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};