import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Switch, Route, NavLink, BrowserRouter, useLocation } from 'react-router-dom';
import About from './components/about';
import { FullArticle } from './components/fullArticle';

import { Search } from './components/search-panel';
import { NotFound } from './components/notFound';
import { useAppSelector } from './redux/store';

function AppWrapper(): JSX.Element {
  const location = useLocation();
  const { articles } = useAppSelector((state) => state.articles);
  return (
    <TransitionGroup className="wrapper">
      <CSSTransition key={location.key} classNames="fade" timeout={200}>
        <Switch location={location}>
          <Route path="/about">
            <About />
          </Route>

          {articles.map((article, index) => {
            return (
              <Route
                path={`/${article.author}${article.publishedAt}`}
                key={index + article.url}
              >
                <FullArticle article={article} />
              </Route>
            );
          })}

          <Route exact path="/">
            <Search />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
}

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <nav>
            <ul className="navigation">
              <li>
                <NavLink exact to="/">
                  Main Page
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <AppWrapper />
      </div>
    </BrowserRouter>
  );
}
