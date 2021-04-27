import {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Routes} from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';
import ValidationMessage from '../ValidationMessage';

import './login-style.scss';
import { validateUsername } from './validateUsername';

const Login = () => {
  const {push} = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setUsername(value);
    if (usernameError) {
      setUsernameError('');
    }
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const usernameValidationMessage = validateUsername(username);
    if (usernameValidationMessage) {
      setUsernameError(usernameValidationMessage);
    }

    if (!usernameValidationMessage && !passwordError) {
      try {
        await login(username, password);
        push(Routes.PasswordHealth);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <input
          value={username}
          onChange={onUsernameChange}
          placeholder="Username"
          type="text"
          className={'input mt-52px ' + (!!usernameError && 'input--invalid')}
        />
        <ValidationMessage message={usernameError} />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-12px"
        />
        <ValidationMessage message={passwordError} />
        <ErrorBlock error={errorMessage} />
        <button
          type="submit"
          className="button mt-12px"
          disabled={!!usernameError || !!passwordError}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
