import React, { FC } from 'react';
import { ArticleInt } from '../interfaces/articles';
import '../assets/fullArticle.scss';

export const FullArticle: FC<{
  article: ArticleInt;
}> = ({ article }) => {
  return (
    <div className="fullarticle-wrapper">
      <div className="fullarticle">
        <div className="fullarticle_left">
          <div
            className="fullarticle_img"
            style={{ backgroundImage: `url(${article.urlToImage})` }}
          ></div>
          <div className="fullarticle_info">
            <div className="fullarticle_info_title">{article.title}</div>
            <div>by {article.author}</div>
            <div>from {article.source.name}</div>
            <div>published at {new Date(article.publishedAt).toLocaleDateString()}</div>
          </div>
        </div>
        <a
          href={article.url}
          target="_blank"
          className="fullarticle_right"
          title="Link to News page"
        >
          {article.content}
        </a>
      </div>
    </div>
  );
};
