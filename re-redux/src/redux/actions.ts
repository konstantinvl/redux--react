import { Action, PayloadAction } from '@reduxjs/toolkit';

export const SET_SORT_VALUE = 'articles/setSortValue';
export const SET_SEARCH_VALUE = 'articles/setSearchValue';
export const SET_ACTIVE_VALUE = 'articles/setActiveValue';
export const SET_LOADING = 'articles/setLoadingg';
export const SET_ACTIVE_PAGE = 'articles/setActivePage';
export const SET_ARTICLES = 'articles/setArticles';

export function setSortValue(sort: string): PayloadAction<string> {
  return { type: SET_SORT_VALUE, payload: sort };
}

export function setSearchValue(searchValue: string): PayloadAction<string> {
  return { type: SET_SEARCH_VALUE, payload: searchValue };
}

export function setActiveValue(activeValue: string): PayloadAction<string> {
  return { type: SET_ACTIVE_VALUE, payload: activeValue };
}

export function setLoading(): Action {
  return { type: SET_LOADING };
}
export function setActivePage(page: number): PayloadAction<number> {
  return { type: SET_ACTIVE_PAGE, payload: page };
}
