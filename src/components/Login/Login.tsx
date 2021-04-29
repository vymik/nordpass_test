import {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Routes} from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';
import ValidationMessage from '../ValidationMessage';
import {FieldId} from './constants';
import './login-style.scss';
import {validatePassword} from './validatePassword';
import {validateUsername} from './validateUsername';

const Login = () => {
  const {push} = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, id} = event.target;
    const isUsernameField = id === FieldId.Username;
    const setFieldValue = isUsernameField ? setUsername : setPassword;
    const setError = isUsernameField ? setUsernameError : setPasswordError;
    const error = isUsernameField ? usernameError : passwordError;

    setFieldValue(value);

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    const usernameValidationMessage = validateUsername(username);
    const passwordValidationMessage = validatePassword(password);

    if (usernameValidationMessage) {
      setUsernameError(usernameValidationMessage);
    }

    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
    }

    if (!usernameValidationMessage && !passwordValidationMessage) {
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
          id={FieldId.Username}
          onChange={handleChange}
          placeholder="Username"
          type="text"
          className={'input mt-52px ' + (!!usernameError && 'input--invalid')}
        />
        <ValidationMessage message={usernameError} />
        <input
          value={password}
          id={FieldId.Password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className={'input mt-12px ' + (!!passwordError && 'input--invalid')}
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
