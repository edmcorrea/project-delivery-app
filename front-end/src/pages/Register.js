import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRegister, setToken } from '../services/request.register';
import '../styles/register.css';
import duckLogin from '../images/duck-login.png';

function Register() {
  const history = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const user = await requestRegister('/user', { name, email, password });
      setToken(user.token);
      localStorage.setItem('user', JSON.stringify(user));
      history('/customer/products');
    } catch (_error) {
      setError(true);
    }
  };

  useEffect(() => {
    const passwordChars = 6;
    const nameChars = 12;
    const regexMail = /\S+@\S+\.\S+/;
    if (name.length >= nameChars
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
    <div className="register-page">
      <div className="register-container">
        <form>
          <img
            alt="duck-duck-login"
            src={ duckLogin }
            style={ { width: '200px', height: '170px' } }
          />
          <br />
          <label htmlFor="nomeRegister">
            <input
              className={ name ? 'has-val' : 'csinput' }
              data-testid="common_register__input-name"
              id="nomeRegister"
              type="text"
              name="name"
              value={ name }
              onChange={ handleChange }
            />
            <span className="focus-input" data-placeholder="Nome" />
          </label>
          <label htmlFor="emailRegister">
            <input
              className={ email ? 'has-val' : 'csinput' }
              data-testid="common_register__input-email"
              id="emailRegister"
              type="email"
              name="email"
              value={ email }
              onChange={ handleChange }
            />
            <span className="focus-input" data-placeholder="Email" />
          </label>
          <label htmlFor="senhaRegister">
            <input
              className={ password ? 'has-val' : 'csinput' }
              data-testid="common_register__input-password"
              id="senhaRegister"
              type="password"
              name="password"
              value={ password }
              onChange={ handleChange }
            />
            <span className="focus-input" data-placeholder="Senha" />
          </label>
          <br />
          <button
            className="register-btn"
            data-testid="common_register__button-register"
            type="button"
            disabled={ disableBtn }
            onClick={ handleSubmit }
          >
            Cadastrar
          </button>
        </form>
        {error && (
          <p
            className="register-invalid"
            data-testid="common_register__element-invalid_register"
          >
            Registro inválido
            {' '}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
