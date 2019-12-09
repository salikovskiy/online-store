import services from './services';

const defaultUser = {
  email: 'anna2546542@gmail.com',
  password: 'qwerty123',
  name: 'Anna',
};
const defaultUserLog = {
  email: 'anna2546542@gmail.com',
  password: 'qwerty123',
};

// services.registrateUser(defaultUser);
services.loginUser(defaultUserLog);
// services.logoutUser(defaultUser);
