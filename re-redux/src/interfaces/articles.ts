export interface ArticleInt {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id?: number;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
