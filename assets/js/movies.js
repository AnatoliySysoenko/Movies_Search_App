/** @format */

import {
  addMovieToList,
  clearMoviesMarkup,
  createMarkup,
  createStyle,
  inputSearch,
  moviesList,
  triggerMode,
} from './dom.js';

let siteUrl = null;
let searchLast = null;

const getData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (!json && !json.Search)
        throw Error('Сервер вернул не правильный объект');
      return json.Search;
    });

const debounce = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(cb, ms);
  };
})();

const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();

    if (
      searchString &&
      searchString.length > 3 &&
      searchString !== searchLast
    ) {
      if (!triggerMode) clearMoviesMarkup(moviesList);
      getData(`${siteUrl}?s=${searchString}&apikey=9ef2c1f1`)
        .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
        .catch((err) => console.error(err));
    }
    searchLast = searchString;
  }, 2000);
};

export const initApp = (url) => {
  createStyle();
  createMarkup();
  siteUrl = url || 'https://www.omdbapi.com/';
  inputSearch.addEventListener('keyup', inputSearchHandler);
};
