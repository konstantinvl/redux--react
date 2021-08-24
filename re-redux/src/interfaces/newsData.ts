import { ArticleInt } from './articles';

export interface NewsData {
  status: string;
  totalResults: number;
  articles: ArticleInt[];
}
