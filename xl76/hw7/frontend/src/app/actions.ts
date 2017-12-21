import {resource} from './resource';

const testResource = ( test ) => {
  return resource('GET', 'test', test);
}

const httpError = ( test ) => {
  return resource('GET', 'test', test);
}

const POSTble = ( test ) => {
  return resource('POST', 'test', test);
}

const updErrMsg = (errMsg) => {
  return resource('GET', 'test', errMsg);
}

const updSucMsg = (sucMsg) => {
  return resource('GET', 'test', sucMsg);
}

const navigate = (url) => {
  return resource('POST', 'test', url);
}

export { testResource, httpError, POSTble, updErrMsg, updSucMsg, navigate };
