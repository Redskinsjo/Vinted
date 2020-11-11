import React from "react";
import Logo from "../../assets/img/logo.jpg";
import "./index.css";

const Header = () => {
  return (
    <div className="super-container-header">
      <div className="container-header">
        <div className="header">
          <img src={Logo} alt="" />
          <form action="">
            <select type="select">
              <option value="articles">Articles</option>
              <option value="membres">Membres</option>
              <option value="forum">Forum</option>
              <option value="centres-d'aide">Centre d'aide</option>
            </select>
            <input type="text" placeholder="Rechercher des articles" />
          </form>
          <button className="header-button-first-child">S'inscrire</button>
          <button className="header-button-first-child">Se connecter</button>
          <button className="header-button-third-child">
            Vends tes articles
          </button>
          <i className="far fa-question-circle"></i>{" "}
          <select type="select">
            <option value="French">Français (French)</option>
            <option value="English">English (English)</option>
            <option value="Spanish">Español (Spanish)</option>
            <option value="Dutch">Nederlands (Dutch)</option>
          </select>
        </div>
      </div>
      <nav className="container-navigation"></nav>
      <div className="container-home-image"></div>
    </div>
  );
};

export default Header;
