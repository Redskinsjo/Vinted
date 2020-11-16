import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookie from 'js-cookie';
import Header from './components/Header';
import Footer from './components/Footer';
import Offer from './containers/Offer/index';
import Login from './containers/Login/index';
import Signup from './containers/Signup/index';
import Home from './containers/Home/index';
import Publish from './containers/Publish/index';
import './App.css';

function App() {
  const [token, setToken] = useState(Number(Cookie.get('token') || 0));
  const [displayModalLogin, setDisplayModalLogin] = useState(false);
  const [displayModalSignup, setDisplayModalSignup] = useState(false);
  const [inputTitle, setInputTitle] = useState('');

  const setUser = (cookieToken) => {
    if (cookieToken) {
      Cookie.set('token', cookieToken, { expires: 1 });
      setToken(cookieToken);
    } else {
      Cookie.remove('token');
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setDisplayModalLogin={setDisplayModalLogin}
        setDisplayModalSignup={setDisplayModalSignup}
        setInputTitle={setInputTitle}
      />
      {displayModalLogin ? (
        <Login
          display={displayModalLogin}
          setDisplay={setDisplayModalLogin}
          setUser={setUser}
        ></Login>
      ) : null}
      {displayModalSignup ? (
        <Signup
          display={displayModalSignup}
          setDisplay={setDisplayModalSignup}
          setUser={setUser}
        ></Signup>
      ) : null}

      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login"></Route>
        <Route path="/signup"></Route>
        <Route path="/publish">
          <Publish />
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
