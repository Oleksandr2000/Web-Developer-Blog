export type Post = {
  title: string;
  text: string;
  img: any;
  tags: string;
};

export type Posts = {
  _id: any;
  title: string;
  createdAt: string;
  updatedAt: string;
  img: string;
  user: any;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  text: string;
};

export type QueryPost = {
  filter?: string;
  sort?: string;
};
