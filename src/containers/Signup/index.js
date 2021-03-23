import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import parsePhoneNumber from "libphonenumber-js";
import "./index.css";
import "antd/dist/antd.css";
import { message } from "antd";

const Signup = ({ setUser, display, setDisplay, setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("FR");
  const phoneInput = useRef(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3030/users", {
        username,
        email,
        password,
        phone,
      });
      console.log(response);

      setLoggedIn(true);
      setDisplay(false);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const response = await Axios.post(
    //     "https://lereacteurvinted.herokuapp.com/user/signup",
    //     {
    //       username,
    //       email,
    //       password,
    //       phone,
    //     }
    //   );
    //   if (response.status === 200) {
    //     const token = response.data.token;
    //     setLoggedIn(true);
    //     setUser(token);
    //     setDisplay(false);
    //     history.push("/");
    //   }
    // } catch (error) {
    //   switch (error.response.data.error.message) {
    //     case "These fields should be present: username, email, password":
    //       message.error(error.response.data.error.message);
    //       break;
    //     case "A user with this email address already exists":
    //       message.error(error.response.data.error.message);
    //       break;
    //     default:
    //       console.log("An error occured");
    //   }
    // }
  };

  const formatNumber = (number) => {
    const phoneNumber = parsePhoneNumber(number, phoneCountry);
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
      className={display ? "modalOn" : "modalOff"}
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
          onSubmit={(e) => {
            handleSubmit(e);
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
          <div style={{ display: "flex" }}>
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
            {phoneCountry === "FR" ? (
              <img
                style={{ width: "40px", height: "30px" }}
                src="https://img.icons8.com/color/48/000000/france.png"
                alt=""
              />
            ) : phoneCountry === "GB" ? (
              <img
                style={{ width: "40px", height: "30px" }}
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
