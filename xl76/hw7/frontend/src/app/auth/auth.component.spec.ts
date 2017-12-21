import {url} from '../resource';
import {login, logout} from './authentication';
import 'fetch-mock';

describe('Validate Authentication (involves mocked requests)', () => {
  const fetchMock = require('fetch-mock');

  afterEach(() => {
    fetchMock.restore();
  });

  it('should log in a user', (done) => {

    const username = 'xl76';
    const password = '1-2-34';

    fetchMock.mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {username: username, status: 'success'}
    }).spy();

    login(username, password).then(r => {
      expect(r.status).toEqual('success');
    }).then(done)
      .catch(done);
  });

  it('should not log in an invalid user', (done) => {
    const username = 'xl90';
    const password = '0-0-0';

    fetchMock.mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {username: username, status: 'fail'}
    }).spy();

    login(username, password).then(r => {
      expect(r.status).toEqual('fail');
    }).then(done)
      .catch(done);
  });

  it('should log out a user (state should be cleared)', (done) => {
    fetchMock.mock(`${url}/logout`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {status: 'success'}
    });

    logout().then(r => {
      expect(r.status).toEqual('success');
    }).then(done)
      .catch(done);
  });
});
