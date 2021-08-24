import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ArticleInt } from '../interfaces/articles';
import { NewsData } from '../interfaces/newsData';
import { StateInt } from '../interfaces/stateInt';
import axiosInstance from '../services/api';
import { setLoading } from './actions';
// import { getNews } from './asyncThunk';
import type { RootState } from './store';

export const initialState: StateInt = {
  searchValue: '',
  activeValue: '',
  isLoading: false,
  activePage: 1,
  sorting: 'publishedAt',
  totalPages: 0,
  articles: [],
};

const ApiKey = 'ad0d5dccbe6f4b4ca76a008c07af4c4b';

export const getNews = createAsyncThunk(
  'users/setArticles',
  async (
    _id,
    thunkAPI
  ): Promise<undefined | { articles: ArticleInt[]; totalPages: number }> => {
    const arrState: { articles: StateInt } = <{ articles: StateInt }>thunkAPI.getState();

    const { activeValue, activePage, sorting } = arrState.articles;

    if (activeValue !== '') {
      thunkAPI.dispatch(setLoading());

      const response: AxiosResponse<NewsData> = await axiosInstance.get(
        `?q=${activeValue}&language=en&apiKey=${ApiKey}
              &sortBy=${sorting}&page=${activePage}`
      );
      const { articles } = response.data;
      const totalPages = Math.ceil(Number(response.data.totalResults) / 20);
      return { articles, totalPages };
    }
    return undefined;
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSortValue: (state, action: PayloadAction<string>) => {
      return <StateInt>{ ...state, sorting: action.payload };
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      return <StateInt>{ ...state, searchValue: action.payload };
    },
    setActiveValue: (state, action: PayloadAction<string>) => {
      return <StateInt>{ ...state, activeValue: action.payload };
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      return <StateInt>{ ...state, activePage: action.payload };
    },
    setLoadingg: (state) => {
      let { isLoading } = state;
      isLoading = !isLoading;
      return <StateInt>{ ...state, isLoading };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action): StateInt | undefined => {
      if (action.payload) {
        const { articles, totalPages } = <{ articles: ArticleInt[]; totalPages: number }>(
          action.payload
        );

        return <StateInt>{
          ...state,
          articles,
          totalPages,
          isLoading: false,
          searchValue: '',
        };
      }
      return undefined;
    });
  },
});

export const { setSortValue, setSearchValue, setActiveValue, setLoadingg } =
  articlesSlice.actions;

export const selectArticles = (state: RootState): { articles: StateInt } => state;
export default articlesSlice.reducer;
