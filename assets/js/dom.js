/** @format */

export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

export const createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
  evt = null,
  handler = null,
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);

  if (evt && handler && typeof handler === 'function') {
    el.addEventListener(evt, handler);
  }

  return el;
};

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
      * {
        box-sizing: border-box;
      }
      html {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        margin: 0;
      }
      .container {
        max-width: 1280px;
        width: 100%;
        padding: 20px;
        margin: 0 auto;
      }
      * {
        box-sizing: border-box;
      }
      html {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        margin: 0;
      }

      .container {
        max-width: 1280px;
        width: 100%;
        padding: 20px;
        margin: 0 auto;
      }

      .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
      }

      .movie {
        display: flex;
        align-content: center;
        justify-content: center;
      }

      .movie__image {
        width: 100%;
        object-fit: cover;
      }

      .search {
        margin-bottom: 30px;
      }

      .search__label-input {
        display: block;
        margin-bottom: 10px;
      }
      .search__input {
        display: block;
        max-width: 400px;
        width: 100%;
        padding: 10px 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 2px solid lightsteelblue;
      }
      .search__label-checkbox {
        display: inline-block;
        font-size: 12px;
        transform: translate(5px, -2px);
      }`,
    },
    container: document.head,
  });
};

export const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: { class: 'container' },
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'h1',
    attrs: {
      innerHTML: 'Приложение для поиска фильмов',
    },
    container,
  });

  const searchBox = createElement({
    type: 'div',
    attrs: { class: 'search' },
    container,
  });

  const inputBox = createElement({
    type: 'div',
    attrs: { class: 'search__group--input' },
    container: searchBox,
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerHTML: 'Поиск фильмов',
    },
    container: inputBox,
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      name: 'search',
      placeholder: 'Начните вводить текст',
    },
    container: inputBox,
  });

  const checkBox = createElement({
    type: 'div',
    attrs: { class: 'search__group--checkBox' },
    container: searchBox,
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
      name: 'checkbox',
    },
    container: checkBox,
    evt: 'click',
    handler: () => (triggerMode = !triggerMode),
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к существующему списку',
    },
    container: checkBox,
  });

  moviesList = createElement({
    type: 'div',
    attrs: { class: 'movies' },
    container,
  });
};

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');

export const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: { class: 'movie' },
    container: moviesList,
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /^(http|https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : 'assets/img/no-image-icon-23485.png',
      title: movie.Title,
      alt: movie.Title,
    },
    container: item,
  });
};
