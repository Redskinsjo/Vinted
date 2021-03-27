import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import "antd/dist/antd.css";
import { message } from "antd";
import io from "socket.io-client";
import feathers from "@feathersjs/client";

// Establish a Socket.io connection
const socket = io("https://lereacteurvinted.herokuapp.com");

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));

// Use localStorage to store our login token
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

const Login = ({
  setUser,
  setToken,
  display,
  setDisplay,
  setLoggedIn,
  setPublishClicked,
  setPurchaseClicked,
  details,
  setDetails,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await client.authenticate({
        strategy: "local",
        email,
        password,
      });
      setLoggedIn(true);
      setToken(accessToken);
      setDisplay(false);
    } catch (error) {
      console.log(error);
      //   switch (error.response.data.error.message) {
      //     case "Missing credentials":
      //       message.error(error.response.data.error.message);
      //       break;
      //     case "No user exist with this email address":
      //       message.error(error.response.data.error.message);
      //       break;
      //     case "Unauthorized":
      //       message.error(error.response.data.error.message);
      //       break;
      //     default:
      //       console.log("an error occured");
      //   }
    }
    // try {
    //   const response = await axios.post(
    //     "https://lereacteurvinted.herokuapp.com/user/login",
    //     { email, password }
    //   );
    //   if (response.status !== 200) {
    //     console.log(response.data);
    //   } else {
    //     const token = response.data.token;
    //     const copyDetails = Object.assign({}, details);
    //     const newDetails = Object.assign(copyDetails, {
    //       user: response.data,
    //     });
    //     setDetails(newDetails);
    //     setLoggedIn(true);
    //     setUser(token);
    //     setDisplay(false);
    //   }
    // } catch (error) {
    //   switch (error.response.data.error.message) {
    //     case "Missing credentials":
    //       message.error(error.response.data.error.message);
    //       break;
    //     case "No user exist with this email address":
    //       message.error(error.response.data.error.message);
    //       break;
    //     case "Unauthorized":
    //       message.error(error.response.data.error.message);
    //       break;
    //     default:
    //       console.log("an error occured");
    //   }
    // }
  };

  return (
    <div
      id="modal"
      className={display ? "modalOn" : "modalOff"}
      onClick={() => {
        setDisplay(false);
        setPublishClicked(false);
        setPurchaseClicked(false);
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
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2
            style={{ left: "110px", marginBottom: "10px" }}
            className="h2-signup"
          >
            Connect to your account
          </h2>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your login email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
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
          <button type="submit" className="button-login">
            Connectez-vous
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
