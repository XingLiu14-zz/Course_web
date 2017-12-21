import { AuthPage } from './auth.po';
import { expect } from 'chai';

describe('Auth', () => {
  let page: AuthPage;
  const url = 'http://localhost:49152';

  beforeEach(() => {
    page = new AuthPage();
  });

  it('login an user', () => {
    page.navigateToLogin();
    page.login()
      .then(res => {
        expect(res).to.equal(url + '/main');
      });
  });
  it('register an user', () => {
    page.navigateToRegistration();
    page.registration()
      .then(res => {
        expect(res).to.equal(url + '/main');
      });
  });
});
