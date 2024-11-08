export type Topic = {
  id: number;
  title: string;
  slug: string;
  authorId: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
};

export type TopicResponse = {
  topics: Topic[];
  page: number;
  total_pages: number;
};
