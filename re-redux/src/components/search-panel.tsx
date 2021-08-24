import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/search-panel.scss';
import {
  setActivePage,
  setActiveValue,
  setSearchValue,
  setSortValue,
} from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getNews } from '../redux/toolkit-reduser';
import { Article } from './article';
import { Page } from './pageSelector';

export function Search(): JSX.Element {
  const {
    articles,
    searchValue,
    activeValue,
    isLoading,
    sorting,
    totalPages,
    activePage,
  } = useAppSelector((state) => state.articles);

  const dispatch = useAppDispatch();

  const [showPages, setShowPages] = useState<JSX.Element[]>([]);

  function printPages(): void {
    if (totalPages) {
      const shownPages: JSX.Element[] = [];
      for (let i = -3; i < 0; i++) {
        if (activePage + i > 0) {
          shownPages.push(<Page num={activePage + i} key={activePage + i} />);
        }
      }
      shownPages.push(<Page num={activePage} key={activePage} />);
      for (let i = 1; i < 4; i++) {
        if (activePage + i < totalPages) {
          shownPages.push(<Page num={activePage + i} key={activePage + i} />);
        }
      }
      setShowPages(shownPages);
    }
  }

  useEffect(printPages, [totalPages, activePage]);
  useEffect(() => {
    dispatch(getNews());
  }, [activePage, sorting]);

  return (
    <div className="dashboard">
      <form
        className="search-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(setActivePage(1));
          dispatch(getNews());
        }}
      >
        <input
          type="text"
          id="search"
          value={searchValue}
          onChange={(event) => {
            dispatch(setSearchValue(event.target.value));
            dispatch(setActiveValue(event.target.value));
          }}
          disabled={isLoading}
        />
        <button className="search-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <div className="sort-wrapper">
        <label htmlFor="sorting">Sorting:</label>
        <select
          name="sorting"
          id="sorting"
          value={sorting}
          onChange={(event) => dispatch(setSortValue(event.target.value))}
        >
          <option value="publishedAt">Newest articles come first</option>
          <option value="popularity">
            Articles from popular sources and publishers come first
          </option>
          <option value="relevancy">Most related articles come first</option>
        </select>
      </div>
      <p className="search-title">
        {activeValue && articles.length ? `Results for ${activeValue}` : ''}
      </p>
      <div className="articles-wrapper">
        {articles.map((article, index) => {
          return (
            <Link to={`/${article.author}${article.publishedAt}`} className="article">
              <Article
                article={article}
                key={index.toString + article.author + article.publishedAt}
              />
            </Link>
          );
        })}
      </div>
      <div className="pages-wrapper">{showPages}</div>
    </div>
  );
}
