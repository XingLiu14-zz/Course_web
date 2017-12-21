import { browser, by, element } from 'protractor';

export class AuthPage {
  navigateToLogin() {
    return browser.get('/landing');
  }

  navigateToRegistration() {
    return browser.get('/landing');
  }

  login() {
    element(by.id('accNameLogin')).sendKeys('xl76');
    element(by.id('pswdLogin')).sendKeys('0-0-0');
    element(by.id('loginBTN')).click();
    browser.sleep(500);
    return browser.getCurrentUrl();
  }
  registration() {
    element(by.id('accName')).sendKeys('xl76');
    element(by.id('disName')).sendKeys('handsomexing');
    element(by.id('eml')).sendKeys('qwe@rice.edu');
    element(by.id('phone')).sendKeys('111-111-1111');
    element(by.id('bday')).sendKeys('1989-12-10');
    element(by.id('zip')).sendKeys('77030');
    element(by.id('pswd')).sendKeys('1-1-1');
    element(by.id('pswdC')).sendKeys('1-1-1');
    element(by.id('regBTN')).click();
    browser.sleep(500);
    return browser.getCurrentUrl();
  }
}
