import services from './services';

const defaultUser = {
  email: 'anna2546542@gmail.com',
  password: 'qwerty123',
  name: 'Anna',
};
<<<<<<< HEAD
const defaultUserLog = {
  email: 'anna2546542@gmail.com',
  password: 'qwerty123',
};
=======
>>>>>>> 48fed714fe616cfd9b590b42f06470be03ef78b7

services.registrateUser(defaultUser);
services.loginUser(defaultUser);
services.logoutUser(defaultUser);
