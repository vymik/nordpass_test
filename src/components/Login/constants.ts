export enum FieldId {
  Username = 'USERNAME',
  Password = 'PASSWORD'
}

export const USERNAME_VALIDATION_MESSAGES = {
  EMPTY: 'Please enter username',
  INVALID: 'Username contains invalid characters',
  SHORT: 'Username too short',
  LONG: 'Username too long'
};

export const PASSWORD_VALIDATION_MESSAGES = {
  EMPTY: 'Please enter password',
  SHORT: 'password too short'
};

export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 25;
export const MIN_PASSWORD_LENGTH = 5;
