import {ArticleComponent} from './article.component';
import {fetchArticle, updateSearchKey, filtArticle} from './articles';
import {url} from '../resource';
import 'fetch-mock';

const allArti = {
  articles: [
    {
      'id': 0,
      'text': 'Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ' +
      'ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. ' +
      'Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, ' +
      'vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. ' +
      'Vivamus euismod mauris.',
      'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
      'comments': 'comment',
      'author': 'xl76',
      'display': false
    },
    {
      'id': 1,
      'text': 'Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras ' +
      'varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, ' +
      'rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam ' +
      'lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. ' +
      'Nam adipiscing. Vestibulum eu odio.',
      'date': '2015-08-28T16:06:42.627Z',
      'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
      'comments': 'comment',
      'author': 'xl76',
      'display': false
    }]
};

const filtArti = {
  articles: [
    {
      'id': 1,
      'text': 'Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras ' +
      'varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, ' +
      'rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam ' +
      'lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. ' +
      'Nam adipiscing. Vestibulum eu odio.',
      'date': '2015-08-28T16:06:42.627Z',
      'img': 'https://www.organicfacts.net/wp-content/uploads/2013/05/Rice2-1020x765.jpg',
      'comments': 'comment',
      'author': 'xl76',
      'display': false
    }]
};

describe('Validate Article actions', () => {
  const fetchMock = require('fetch-mock');

  afterEach(() => {
    fetchMock.restore();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should fetch articles (mocked request)', (done) => {
    fetchMock.mock(`${url}/main`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: {allArti, user: 'xl76'}
    }).spy();

    fetchArticle(allArti).then(r => {
      expect(r.allArti).toEqual(allArti);
    }).then(done)
      .catch(done);
  });

  const key = 'Praesent';
  it('should update the search keyword', (done) => {
    fetchMock.mock(`${url}/main`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {searchKey: key}
    }).spy();

    updateSearchKey(key).then(r => {
      expect(r.searchKey).toEqual(key);
    }).then(done)
      .catch(done);
  });

  it('should filter displayed articles by the search keyword', (done) => {

    // console.log(filtArticle(allArti.articles, key));
    // console.log(filtArti.articles);

    expect(filtArticle(allArti.articles, key)).toEqual(filtArti.articles);
    done();
  });
});
