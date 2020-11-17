import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import parsePhoneNumber from 'libphonenumber-js';
import './index.css';

const Signup = ({ setUser, display, setDisplay, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('FR');
  const phoneInput = useRef(null);

  const history = useHistory();

  const formatNumber = (number) => {
    const phoneNumber = parsePhoneNumber(number, phoneCountry);
    console.log(phoneNumber);
    console.log(phoneNumber.formatInternational());
    // return phoneNumber.formatInternational();
    phoneInput.current.value = phoneNumber.formatInternational();
  };
  useEffect(() => {
    if (phone.length === 10) {
      formatNumber(phone);
    }
  }, [phone, phoneCountry]);

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
        className="modal-signup-popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await Axios.post(
              'https://lereacteurvinted.herokuapp.com/user/signup',
              {
                username,
                email,
                password,
                phone,
              }
            );
            if (response.status !== 200) {
              console.log(response.data);
            } else {
              const token = response.data.token;
              setLoggedIn(true);
              setUser(token);
              setDisplay(false);
              history.push('/');
            }
          }}
        >
          <h2 className="h2-signup">Create an account</h2>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter an email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <div style={{ display: 'flex' }}>
            <input
              name="phone"
              type="tel"
              placeholder="Enter a phone number"
              ref={phoneInput}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <select
              id="selectPhoneCountry"
              onChange={(e) => {
                setPhoneCountry(e.target.value);
              }}
            >
              <option value="FR">French</option>
              <option value="GB">English</option>
            </select>
            {phoneCountry === 'FR' ? (
              <img
                style={{ width: '40px', height: '30px' }}
                src="https://img.icons8.com/color/48/000000/france.png"
                alt=""
              />
            ) : phoneCountry === 'GB' ? (
              <img
                style={{ width: '40px', height: '30px' }}
                src="https://img.icons8.com/emoji/48/000000/united-kingdom-emoji.png"
                alt=""
              />
            ) : null}
          </div>
          <button type="submit" className="form-button">
            Créez un compte
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
