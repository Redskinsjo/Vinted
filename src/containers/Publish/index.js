import React from 'react';
import './index.css';

const Publish = () => {
  return (
    <div className="super-container-publish">
      <form className="container-publish">
        <h2>Vends ton article</h2>
        <div className="pictures-publish"></div>
        <div className="title-and-description-publish"></div>
        <div className="details-publish"></div>
        <div className="price-publish"></div>
        <button>Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
