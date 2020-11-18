import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import './index.css';

const Publish = ({ token, setPublishClicked }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quality, setQuality] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const routerLoc = location();

  if (routerLoc.state?.afterPublishClickedAndLogin) {
    setPublishClicked(false);
  }

  // const details = {
  //   brand,
  //   size,
  //   color,
  //   quality,
  //   location,
  // };

  const formData = new FormData();
  formData.append('product_name', title);
  formData.append('product_image', picture);
  formData.append('product_price', price);
  formData.append('product_description', description);
  formData.append('brand', brand);
  formData.append('size', size);
  formData.append('color', color);
  formData.append('quality', quality);
  formData.append('location', location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (picture) {
        const response = await Axios.post(
          'https://lereacteurvinted.herokuapp.com/offer/publish',
          formData,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="super-container-publish">
      <form className="container-publish" onSubmit={handleSubmit}>
        <h2 className="h2-publish">Vends ton article</h2>
        <div className="pictures-publish">
          <div>
            <label htmlFor="picture"></label>
            <input
              type="file"
              name="picture"
              onChange={(e) => {
                setPicture(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="title-and-description-publish">
          <div className="title-publish">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              value={title}
              placeholder="ex: un tee-shirt Versace en col V"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="description-publish">
            <label htmlFor="description">Décris ton article</label>
            <textarea
              name="description"
              value={description}
              placeholder="ex: Ce tee-shirt a été fait en Thaïlande et est fait de coton à 80%"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="details-publish">
          <div className="brand-publish">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              name="brand"
              value={brand}
              placeholder="ex: Zara"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
          <div className="size-publish">
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              name="size"
              value={size}
              placeholder="ex: M / 38"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
          <div className="color-publish">
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              name="color"
              value={color}
              placeholder="ex: Rouge bordeaux"
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
          <div className="state-publish">
            <label htmlFor="state">Etat</label>
            <input
              type="text"
              name="state"
              value={quality}
              placeholder="ex: De bonne qualité, jamais porté"
              onChange={(e) => {
                setQuality(e.target.value);
              }}
            />
          </div>
          <div className="location-publish">
            <label htmlFor="location">Lieu</label>
            <input
              type="text"
              name="location"
              value={location}
              placeholder="ex: Région parisienne"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="price-publish">
          <label htmlFor="price">Prix</label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="ex: 8euros"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            onFocus={(e) => {
              e.target.className = 'inputOnFocus';
            }}
          />
        </div>
        <div className="div-button-publish">
          <button type="submit" className="button-publish">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
