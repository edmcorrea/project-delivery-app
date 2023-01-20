import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  /* function handleSubmit(event) {
    event.preventDefault();
    // Validate login credentials here
    setIsLoggedIn(true);
  } */

  const validateLogin = (event) => {
    event.preventDefault();
    const magicNumber = 6;

    const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (password.length < magicNumber || !regexMail.test(email)) return setError(true);
    console.log(error);
    console.log(password);
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
            data-testid="common_login__input-email1"
            onChange={ (event) => setEmail(event.target.value) }
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
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="common_login__button-login"
          onClick={ validateLogin }
        >
          Login

        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"

        >
          Ainda não tenho conta

        </button>
        {error
        && <p data-testid="common_login__element-invalid-email">Login inválido </p>}
      </form>
    </div>
  );
}
export default Login;
