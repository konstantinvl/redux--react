import React from 'react';
import { ArticleInt } from '../interfaces/articles';
import '../assets/article.scss';

export function Article(props: { article: ArticleInt }): JSX.Element {
  const { article } = props;
  return (
    <div className="article_wrapper">
      <div
        className="article_img"
        style={{ backgroundImage: `url(${article.urlToImage})` }}
      >
        {' '}
      </div>
      <div className="article_info-wrapper">
        <div className="title" title={article.title}>
          {article.title && article.title.length > 73
            ? `${article.title.slice(0, 70)}...`
            : article.title}
        </div>
        <div className="author" title={article.author}>
          by{' '}
          {article.author && article.author.length > 15
            ? article.author.slice(0, 15)
            : article.author}{' '}
          on {new Date(article.publishedAt).toLocaleDateString()}
        </div>
      </div>
      <div className="article_description">{article.description}</div>
    </div>
  );
}
