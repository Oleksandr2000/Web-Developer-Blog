import React from 'react';

import { SideBlock } from './SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

interface CommentsProps {
  items: any;
  children?: unknown;
  isLoading: boolean;
}

export const CommentsBlock: React.FC<CommentsProps> = ({ items, children, isLoading }) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj: any, index: number) => (
          <div key={isLoading ? index : obj._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? <Skeleton variant="circular" width={40} height={40} /> : <Avatar />}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText primary={obj.userName} secondary={obj.content} />
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      {children && children}
    </SideBlock>
  );
};
