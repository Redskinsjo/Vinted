import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Offer from "./containers/Offer/index";
import Login from "./containers/Login/index";
import Signup from "./containers/Signup/index";
import Home from "./containers/Home/index";
import Publish from "./containers/Publish/index";
import Payment from "./containers/Payment/index";
import "./App.css";
import "./reset.css";
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

function App() {
  const [token, setToken] = useState(localStorage.getItem("feathers-jwt") || 0);
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [publishClicked, setPublishClicked] = useState(false);
  const [purchaseClicked, setPurchaseClicked] = useState(false);
  const [details, setDetails] = useState({ offer: {} });

  // Function to connect or disconnect the user
  const setUser = (cookieToken) => {
    if (cookieToken) {
      Cookie.set("token", cookieToken, { expires: 10 });
      setToken(cookieToken);
    } else {
      Cookie.remove("token");
      setToken(null);
    }
  };

  //   const authenticate = async (strategy, email, password) => {
  //       return await client.auth
  //   }

  const login = async () => {
    try {
      // First try to log in with an existing JWT
      const { accessToken } = await client.reAuthenticate();
      setLoggedIn(true);
      setToken(accessToken);
    } catch (error) {
      // If that errors, log in with email/password
      // Here we would normally show a login page
      // to get the login information
      await setDisplayModalLogin(true);
      //   return await client.authenticate({
      //     strategy: "local",
      //     email: "hello@feathersjs.com",
      //     password: "supersecret",
      //   });
    }
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (!loggedIn && publishClicked) {
      setDisplayModalLogin(true);
    }
    if (!loggedIn && purchaseClicked) {
      setDisplayModalLogin(true);
    }
  }, [publishClicked, purchaseClicked]);

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setDisplayModalLogin={setDisplayModalLogin}
        setDisplayModalSignup={setDisplayModalSignup}
        setInputTitle={setInputTitle}
        setLoggedIn={setLoggedIn}
        setPublishClicked={setPublishClicked}
        setDetails={setDetails}
      />

      {/* Système d'affichage d'une modal pour le login et le signup */}
      {displayModalLogin ? (
        <Login
          display={displayModalLogin}
          setDisplay={setDisplayModalLogin}
          setUser={setUser}
          setToken={setToken}
          setLoggedIn={setLoggedIn}
          publishClicked={publishClicked}
          setPublishClicked={setPublishClicked}
          purchaseClicked={purchaseClicked}
          setPurchaseClicked={setPurchaseClicked}
          details={details}
          setDetails={setDetails}
        ></Login>
      ) : null}
      {displayModalSignup ? (
        <Signup
          setToken={setToken}
          display={displayModalSignup}
          setDisplay={setDisplayModalSignup}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        ></Signup>
      ) : null}
      {/* ------------------------ */}

      {/* Verification that user is logged in before redirection */}
      {purchaseClicked && loggedIn ? (
        <Redirect
          to={{
            pathname: "/payment",
            state: { afterPurchaseClickedAndLogin: true },
          }}
        />
      ) : (
        () => {
          setDisplayModalLogin(true);
        }
      )}
      {publishClicked && loggedIn ? (
        <Redirect
          to={{
            pathname: "/publish",
            state: { afterPublishClickedAndLogin: true },
          }}
        />
      ) : (
        () => {
          setDisplayModalLogin(true);
        }
      )}
      {/* ------------------- */}

      <Switch>
        <Route path="/offer/:id">
          <Offer
            setPurchaseClicked={setPurchaseClicked}
            token={token}
            details={details}
            setDetails={setDetails}
          />
        </Route>

        <Route path="/publish">
          {(arg) => {
            if (token) {
              return (
                <Publish token={token} setPublishClicked={setPublishClicked} />
              );
            }
          }}
        </Route>
        <Route path="/payment">
          <Payment
            details={details}
            setDetails={setDetails}
            purchaseClicked={purchaseClicked}
            setPurchaseClicked={setPurchaseClicked}
          />
        </Route>
        <Route path="/">
          <Home inputTitle={inputTitle} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
