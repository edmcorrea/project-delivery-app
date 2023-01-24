import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin, setToken } from '../services/request.login';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  /* function handleSubmit(event) {
    event.preventDefault();
    // Validate login credentials here
    setIsLoggedIn(true);
  } */

  const validateLogin = async (event) => {
    event.preventDefault();
    try {
      const { token } = await requestLogin('/login', { email, password });
      console.log(token);
      setToken(token);
      history('/customer/products');
    } catch (_error) {
      setError(true);
    }
  };

  useEffect(() => {
    const magicNumber = 6;
    const regexMail = /\S+@\S+\.\S+/;
    if (password.length >= magicNumber && regexMail.test(email)) {
      return setDisableBtn(false);
    }

    return setDisableBtn(true);
  }, [email, password]);

  const handleChange = ({ target }) => {
    const { type, value } = target;
    if (type === 'text') setEmail(value);
    if (type === 'password') setPassword(value);
  };

  return (
    <div>
      <form>
        <label htmlFor="login">
          Login
          <input
            id="login"
            type="text"
            value={ email }
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha
          <input
            id="password"
            type="password"
            value={ password }
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disableBtn }
          onClick={ validateLogin }
        >
          Login
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => history('/register') }
        >
          Ainda não tenho conta

        </button>
        {error && (
          <p data-testid="common_login__element-invalid-email">
            Login inválido
            {' '}
          </p>
        )}
      </form>
    </div>
  );
}
export default Login;
