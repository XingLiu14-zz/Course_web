import { browser, by, element } from 'protractor';

export class MainPage {
  navigateTo() {
    browser.get('/landing');
    element(by.id('accNameLogin')).sendKeys('xl76');
    element(by.id('pswdLogin')).sendKeys('0-0-0');
    element(by.id('loginBTN')).click();
    browser.sleep(500);
  }
  createArticle() {
    element(by.id('post')).sendKeys('new article');
    element(by.id('postBTN')).click();
    browser.sleep(200);
    return element.all(by.id('allArticles')).get(0).getText();
  }
  updateHeadline() {
    element(by.id('headline')).sendKeys('new headline');
    element(by.id('headlineBTN')).click();
    browser.sleep(200);
    return element(by.id('headlineDisplay')).getText();
  }
  countFollower() {
    const count = element.all(by.id('allFollowers')).count();
    browser.sleep(200);
    return count;
  }
  addFollower() {
    element(by.id('newFollower')).sendKeys('py20');
    element(by.id('followBTN')).click();
    browser.sleep(200);
    return element.all(by.id('allFollowers')).count();
  }
  deleteFollower() {
    element(by.id('deletepy20')).click();
    browser.sleep(200);
    return element.all(by.id('allFollowers')).count();
  }
  searchArticle() {
    element(by.id('search')).sendKeys('zxcoyiqhwhdkas');
    element(by.id('searchBTN')).click();
    browser.sleep(200);
    return element.all(by.id('allArticles')).count();
  }
}
