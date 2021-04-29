import {API} from '~/constants';

const logout = async () => {
  await fetch(API.Logout, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  localStorage.removeItem('token');
};

export default logout;
