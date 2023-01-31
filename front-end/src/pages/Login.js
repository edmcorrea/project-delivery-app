import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../Context/Context';
import { requestLogin, setToken } from '../services/request.login';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const { setUserRole } = useContext(Context);
  /* function handleSubmit(event) {
    event.preventDefault();
    // Validate login credentials here
    setIsLoggedIn(true);
  } */

  const setUserRoleContext = (user) => {
    if (user) {
      setUserRole(user.role);
      if (user.role === 'customer') history('/customer/products');
      if (user.role === 'seller') history('/seller/orders');
    }
  };

  const validateLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await requestLogin('/login', { email, password });
      setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));
      setUserRoleContext(user);
    } catch (_error) {
      setError(true);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRoleContext(user);
  }, []);

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
          name="login"
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
