import { USERNAME_VALIDATION_MESSAGES, MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH } from "./constants";

export const validateUsername = (username: string) => {
  let message = '';
  const invalidChars = /\W/; // valid chars: numbers, letters, underscores

  if (!username) {
    message = USERNAME_VALIDATION_MESSAGES.EMPTY;
  } else if (username.length < MIN_USERNAME_LENGTH) {
    message = USERNAME_VALIDATION_MESSAGES.SHORT;
  } else if (username.length > MAX_USERNAME_LENGTH) {
    message = USERNAME_VALIDATION_MESSAGES.LONG;
  } else if (invalidChars.test(username)) {
    message = USERNAME_VALIDATION_MESSAGES.INVALID;
  }

  return message;
};
