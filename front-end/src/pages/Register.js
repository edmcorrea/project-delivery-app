import React, { useEffect, useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  // const [error, setError] = useState(false);

  /* const handleSubmit = (event) => {
      event.preventDefault();
      try {
        const { token } = await requestRegister('/register', { name, email, password });

        setToken(token);
      } catch (_error) {
        setError(true);
      }
    }; */

  useEffect(() => {
    const passwordChars = 6;
    const nameChars = 12;
    const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name.length < nameChars
       && password.length >= passwordChars
        && regexMail.test(email)) {
      return setDisableBtn(false);
    }

    return setDisableBtn(true);
  }, [name, email, password]);

  const handleChange = ({ target }) => {
    const { type, value } = target;
    if (type === 'email') setEmail(value);
    if (type === 'password') setPassword(value);
    if (type === 'text') setName(value);
  };

  return (
    <div>
      <form>
        <label htmlFor="nomeRegister">
          Nome
          <input
            data-testid="common_register__input-name"
            id="nomeRegister"
            type="text"
            name="name"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="emailRegister">
          Email
          <input
            data-testid="common_register__input-email"
            id="emailRegister"
            type="email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <br />
        <label htmlFor="senhaRegister">
          Senha
          <input
            data-testid="common_register__input-password"
            id="senhaRegister"
            type="password"
            name="password"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <br />
        <button
          data-testid="common_login__button-register"
          type="submit"
          disabled={ disableBtn }
          // onClick={ handleSubmit }
        >
          Cadastrar

        </button>
        {/* error && (
          <p data-testid="common_register__element-invalid_register">
            Registro inválido
            {' '}
          </p>
        ) */}
      </form>
    </div>
  );
}

export default Register;
