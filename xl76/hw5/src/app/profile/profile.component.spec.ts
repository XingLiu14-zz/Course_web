import {url} from '../resource';
import 'fetch-mock';
import {fetchProfile, updateHeadline} from './profileForm';

const profile = {
  'id': 0,
  'userName': 'xl76',
  'displayName': 'Xing',
  'email': 'handsome@rice.edu',
  'zip': 77030,
  'avatar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rice_p1160004.jpg/200px-Rice_p1160004.jpg',
  'phone': '123-456-7890',
  'dob': '1989-04-07',
  'headline': 'handsome xing',
  'article': [0, 1],
  'following': [1, 2, 3],
  'pswd': '0-0-0'
}

describe('Validate Profile actions (mocked requests)', () => {
  const fetchMock = require('fetch-mock');

  afterEach(() => {
    fetchMock.restore();
  });

  it('should fetch the users profile information', (done) => {
    fetchMock.mock(`${url}/profile`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: {profile}
    }).spy();

    fetchProfile(profile).then(r => {
      expect(r.profile).toEqual(profile);
    }).then(done)
      .catch(done);
  });

  const newHeadline = 'HiQiLai';
  it('should update headline', (done) => {
    fetchMock.mock(`${url}/profile`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {newHeadLine: newHeadline}
    }).spy();

    updateHeadline(newHeadline).then(r => {
      expect(r.newHeadLine).toEqual(newHeadline);
    }).then(done)
      .catch(done);
  });

});
