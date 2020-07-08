import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import './login.css';

function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (email !== '' && password !== '') {
      api.post('login', { email, password })
        .then(response => {          
          localStorage.setItem('token', response.data.token)
          history.push("/");
        })
        .catch(e => {
          if (e.response && e.response.data) {
            setError(e.response.data.message)
        }
        });
    }
  }, [email])

  function handleSubmit(event) {
    event.preventDefault();
    setEmail(event.target.email.value);
    setPassword(event.target.password.value);
  }

  return (
    <div>
      {error}
      <form onSubmit={handleSubmit} className="text" noValidate>
        <label id="email-label" htmlFor="email">Email</label>
        <input id="email-input" type="text" name="email"/>

        <label id="password-label" htmlFor="password">Senha</label>
        <input id="password-input" type="password" name="password"/>

        <input className="button" type="submit" value="ENTRAR" />
      </form>
    </div>
  )
}

export default Login;