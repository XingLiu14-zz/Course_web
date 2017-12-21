import { resource } from '../resource';

const login = (username, pswd) => {
  return resource('POST', 'login', { username, pswd });
};

const logout = () => {
    return resource('PUT', 'logout', '');
};

export { login, logout };
