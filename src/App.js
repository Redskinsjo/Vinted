import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Cookie from 'js-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Offer from './containers/Offer/index';
import Login from './containers/Login/index';
import Signup from './containers/Signup/index';
import Home from './containers/Home/index';
import Publish from './containers/Publish/index';
import './App.css';
import './reset.css';

function App() {
  const [token, setToken] = useState(Number(Cookie.get('token') || 0));
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [publishClicked, setPublishClicked] = useState(false);

  const setUser = (cookieToken) => {
    if (cookieToken) {
      Cookie.set('token', cookieToken, { expires: 10 });
      setToken(cookieToken);
    } else {
      Cookie.remove('token');
      setToken(null);
    }
  };

  useEffect(() => {
    if (!loggedIn && publishClicked) {
      setDisplayModalLogin(true);
    }
  }, [publishClicked]);

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
      />
      {displayModalLogin ? (
        <Login
          display={displayModalLogin}
          setDisplay={setDisplayModalLogin}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          setPublishClicked={setPublishClicked}
        ></Login>
      ) : null}
      {displayModalSignup ? (
        <Signup
          display={displayModalSignup}
          setDisplay={setDisplayModalSignup}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        ></Signup>
      ) : null}

      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login"></Route>
        <Route path="/signup"></Route>
        <Route path="/publish">
          {loggedIn && publishClicked ? <Publish /> : null}
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
