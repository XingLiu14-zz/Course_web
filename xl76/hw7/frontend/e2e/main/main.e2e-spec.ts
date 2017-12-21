import { MainPage } from './main.po';

describe('Main', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('create a new article', () => {
    page.navigateTo();
    expect(page.createArticle()).toEqual('new article');
  });
  it('update headline', () => {
    page.navigateTo();
    expect(page.updateHeadline()).toEqual('new headline');
  });
  it('count the followers', () => {
    page.navigateTo();
    expect(page.countFollower()).toEqual(3);
  });
  it('add new follower', () => {
    page.navigateTo();
    expect(page.addFollower()).toEqual(4);
  });
  it('delete a follower', () => {
    page.navigateTo();
    expect(page.deleteFollower()).toEqual(3);
  });
  it('search articles', () => {
    page.navigateTo();
    expect(page.searchArticle()).toEqual(0);
  });
});
