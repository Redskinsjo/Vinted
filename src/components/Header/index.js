import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../assets/img/logo.jpg";
import "./index.css";
import io from "socket.io-client";
import feathers from "@feathersjs/client";

// Establish a Socket.io connection
const socket = io(process.env.REACT_APP_SERVER_URL);

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

const Header = ({
  token,
  setUser,
  setDisplayModalLogin,
  setDisplayModalSignup,
  setInputTitle,
  setLoggedIn,
  setPublishClicked,
  setDetails,
}) => {
  const history = useHistory();
  return (
    <div style={{ fontFamily: "Font" }} className="super-container-header">
      <div className="container-header">
        <div className="header">
          <img
            src={Logo}
            alt=""
            onClick={() => {
              history.push("/");
            }}
          />
          <form action="">
            <select type="select">
              <option value="articles">Articles</option>
              <option value="membres">Membres</option>
              <option value="forum">Forum</option>
              <option value="centres-d'aide">Centre d'aide</option>
            </select>
            <div>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Rechercher des articles"
                onChange={(e) => {
                  setInputTitle(e.target.value);
                }}
              />
            </div>
          </form>
          {token ? (
            <button
              onClick={async () => {
                setDetails({ offer: {} });
                setLoggedIn(false);
                setUser(null);
                await client.logout();
                history.push("/");
              }}
              className="header-button-disconnect"
            >
              Se déconnecter
            </button>
          ) : (
            <div>
              <button
                className="header-button-first-child"
                onClick={() => {
                  setDisplayModalSignup(true);
                }}
              >
                S'inscrire
              </button>

              <button
                onClick={() => {
                  setDisplayModalLogin(true);
                }}
                className="header-button-first-child"
              >
                Se connecter
              </button>
            </div>
          )}
          {token ? (
            <Link to="/publish">
              <button
                className="header-button-third-child"
                onClick={() => {
                  setPublishClicked(true);
                }}
              >
                Vends tes articles
              </button>
            </Link>
          ) : (
            <button
              className="header-button-third-child"
              onClick={() => {
                setPublishClicked(true);
              }}
            >
              Vends tes articles
            </button>
          )}
          <i className="far fa-question-circle"></i>{" "}
          <select type="select">
            <option value="French">Français (French)</option>
            <option value="English">English (English)</option>
            <option value="Spanish">Español (Spanish)</option>
            <option value="Dutch">Nederlands (Dutch)</option>
          </select>
        </div>
      </div>

      <div className="super-container-navigation">
        <nav className="container-navigation">
          <div>Femmes</div>
          <div>Hommes</div>
          <div>Enfants</div>
          <div>Maison</div>
          <div>À propos</div>
          <div>Notre plateforme</div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
