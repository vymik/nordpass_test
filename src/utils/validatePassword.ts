import {MIN_PASSWORD_LENGTH, PASSWORD_VALIDATION_MESSAGES} from '../components/Login/constants';

export const validatePassword = (password: string): string => {
  let message = '';

  if (!password) {
    message = PASSWORD_VALIDATION_MESSAGES.EMPTY;
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    message = PASSWORD_VALIDATION_MESSAGES.SHORT;
  }

  return message;
};
