import {resource} from '../resource';

const fetchProfile = ( profile ) => {
  return resource('GET', 'profile', profile);
}

const updateHeadline = ( headline ) => {
  return resource('POST', 'profile', headline);
}

export { fetchProfile, updateHeadline };
