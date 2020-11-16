import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import Main from '../../components/Main';
import HomeImage from '../../assets/img/home-image.jpeg';
import effetDechire from '../../assets/img/dechire.svg';
import './index.css';

const Home = ({ inputTitle }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search);

  const fetchData = async () => {
    // const response = await Axios.get(
    //   'https://lereacteur-vinted-api.herokuapp.com/offers'
    // );
    if (inputTitle) {
      const response = await Axios.get(
        `https://lereacteurvinted.herokuapp.com/offers?title=${inputTitle}`
      );
      setData(response.data);
      setIsLoading(false);
    } else {
      const response = await Axios.get(
        `https://lereacteurvinted.herokuapp.com/offers`
      );
      setData(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log(query.keys());
        }}
      >
        Get query
      </button>
      <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
        <img
          style={{
            width: '100%',
            height: '431.59px',
            objectFit: 'cover',
            zIndex: '1',
          }}
          src={HomeImage}
          alt=""
        />
        <img
          style={{
            position: 'absolute',
            bottom: '0',
            right: 0,
            width: '50%',
            zIndex: '2',
          }}
          src={effetDechire}
          alt=""
        />
        <div className="super-container-CTA">
          <div className="high-container-CTA">
            <div className="container-CTA">
              <div className="CTA">
                <h2>Prêts à faire du tri dans vos placards ?</h2>
                <button>Commencez à vendre</button>
                <span>Apprenez comment ça marche</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Main
        data={data.offers}
        isLoading={isLoading}
        // title={query.get('title')}
        // priceMin={query.get('priceMin')}
        // priceMax={query.get('priceMax')}
        // sort={query.get('sort')}
        // skip={query.get('skip')}
        // limit={query.get('limit')}
      />
    </div>
  );
};

export default Home;
