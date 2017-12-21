import { browser, by, element } from 'protractor';

export class ProfilePage {
  navigateTo() {
    browser.get('/landing');
    element(by.id('account')).sendKeys('xl76');
    element(by.id('password')).sendKeys('0-0-0');
    element(by.id('loginBTN')).click();
    browser.sleep(200);
    browser.get('/profile');
    browser.sleep(200);
  }
  updateEmail() {
    element(by.id('email')).sendKeys('xl@asd.com');
    element(by.id('updBTN')).click();
    browser.sleep(200);
    return element(by.id('emailDisplay')).getText();
  }
  updateZip() {
    element(by.id('zipUpd')).sendKeys('77777');
    element(by.id('updBTN')).click();
    browser.sleep(200);
    return element(by.id('zipDisplay')).getText();
  }
  updatePassword() {
    element(by.id('pswdUpd')).sendKeys('1-1-1');
    element(by.id('pswdCUpd')).sendKeys('1-1-1');
    element(by.id('updBTN')).click();
    browser.sleep(200);
    return 'success';
  }
}
