import React, { FC } from 'react';
import { setActivePage } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/store';

export const Page: FC<{
  num: number;
}> = ({ num }) => {
  const { activePage } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();
  return (
    <div
      className={num === activePage ? 'page-selector-active' : 'page-selector'}
      onClick={() => dispatch(setActivePage(num))}
    >
      {num}
    </div>
  );
};
