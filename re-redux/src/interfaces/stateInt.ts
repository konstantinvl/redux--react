import { ArticleInt } from './articles';

export interface StateInt {
  searchValue: string;
  activeValue: string;
  isLoading: boolean;
  activePage: number;
  sorting: string;
  totalPages: number;
  articles: ArticleInt[];
}
