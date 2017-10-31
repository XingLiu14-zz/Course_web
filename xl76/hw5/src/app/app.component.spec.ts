import { TestBed, async } from '@angular/core/testing';
import {url} from './resource';
import 'fetch-mock';
import { testResource, httpError, POSTble, updErrMsg, updSucMsg, navigate } from './actions';

describe('Validate actions (these are functions that dispatch actions)', () => {
  const fetchMock = require('fetch-mock');

  afterEach(() => {
    fetchMock.restore();
  });

  const test = 'xl76';
  it('resource should be a resource (i.e., mock a request)', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: {test: test}
    }).spy();

    testResource(test).then(r => {
      expect(r.test).toEqual(test);
    }).then(done)
      .catch(done);
  });

  it('resource should give me the http error', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      body: {test: test}
    }).spy();

    httpError(test).catch(e =>
      expect(e).not.toEqual(null)
    )
      .then(done);
  });

  it('resource should be POSTable', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {test: test}
    }).spy();

    POSTble(test).then(r => {
      expect(r.test).toEqual(test);
    }).then(done)
      .catch(done);
  });

  const errMsg = 'err';
  it('should update error message (for displaying error mesage to user)', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {errMsg: errMsg}
    }).spy();

    updErrMsg(errMsg).then(r => {
      expect(r.errMsg).toEqual(errMsg);
    }).then(done)
      .catch(done);
  });

  const sucMsg = 'suc';
  it('should update success message (for displaying success message to user)', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {sucMsg: sucMsg}
    }).spy();

    updSucMsg(sucMsg).then(r => {
      expect(r.sucMsg).toEqual(sucMsg);
    }).then(done)
      .catch(done);
  });

  it('should navigate (to profile, main, or landing)', (done) => {

    fetchMock.mock(`${url}/test`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: {url: url}
    }).spy();

    navigate(url).then(r => {
      expect(r.url).toEqual(url);
    }).then(done)
      .catch(done);
  });

});
