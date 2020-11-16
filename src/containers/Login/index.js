import React, { useState } from 'react';
import Axios from 'axios';
import './index.css';

const Login = ({ setUser, display, setDisplay }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div
      id="modal"
      className={display ? 'modalOn' : 'modalOff'}
      onClick={() => {
        setDisplay(false);
      }}
    >
      <div
        id="modal-popup"
        className="modal-login-popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await Axios.post(
              'https://lereacteurvinted.herokuapp.com/user/login',
              { email, password }
            );
            // console.log(response);
            if (response.status !== 200) {
              console.log(response.data);
            } else {
              const token = response.data.token;
              setUser(token);
              setDisplay(false);
            }
          }}
        >
          <h2 style={{ left: '110px', marginBottom: '10px' }}>
            Connect to your account
          </h2>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your login email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Connectez-vous</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
