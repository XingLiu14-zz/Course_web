import {resource} from '../resource';

const fetchArticle = ( articles ) => {
  return resource('GET', 'main', articles);
}

const updateSearchKey = ( key ) => {
  return resource('POST', 'main', key);
}

const filtArticle = (articles, key) => {
  return articles.filter( arti =>
    arti.text.indexOf(key) !== -1 || arti.author.indexOf(key) !== -1
  );
}

export { fetchArticle, updateSearchKey, filtArticle };
