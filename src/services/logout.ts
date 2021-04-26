import {useHistory} from 'react-router-dom';
import {API, Routes} from '~/constants';
import getUrl from '~/utils/getUrl';

const logout = async () => {
  const response = await fetch(API.Logout, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  localStorage.removeItem('token');
};

export default logout;
