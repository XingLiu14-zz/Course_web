import { ProfilePage } from './profile.po';

describe('Profile', () => {
  let page: ProfilePage;

  beforeEach(() => {
    page = new ProfilePage();
  });

  it('update email', () => {
    page.navigateTo();
    expect(page.updateEmail()).toEqual('xl@asd.com');
  });
  it('update zip', () => {
    page.navigateTo();
    expect(page.updateZip()).toEqual('77777');
  });
  it('update password', () => { //  how to?
    page.navigateTo();
    expect(page.updatePassword()).toEqual('success');
  });
});
