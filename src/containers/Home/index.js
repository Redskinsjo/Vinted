import React, { useState, useEffect } from "react";
import Axios from "axios";
import Main from "../../components/Main";
import HomeImage from "../../assets/img/home-image.jpeg";
import effetDechire from "../../assets/img/dechire.svg";
import "./index.css";
import io from "socket.io-client";
import feathers from "@feathersjs/client";

// Establish a Socket.io connection
const socket = io(process.env.REACT_APP_SERVER_URL);

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));

const Home = ({ inputTitle }) => {
  const [data, setData] = useState();
  //   const [isLoading, setIsLoading] = useState(true);
  console.log(process.env.REACT_APP_SERVER_URL)


  // Fonction qui récupère les biens selon la recherche par nom
  const fetchData = async () => {
    try {
      const { data } = await client.service("offers").find();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
    try {
      if (inputTitle) {
        // const response = await Axios.get(
        //   `https://lereacteurvinted.herokuapp.com/offers?title=${inputTitle}`
        // );
        // setData(response.data);
        // setIsLoading(false);
      } else {
        // const response = await Axios.get(
        //     `https://lereacteurvinted.herokuapp.com/offers`
        // );
        // setData(response.data);
        // setIsLoading(false);
        // const offers = await client.service(offers).find();
        // setData(offers);
        // setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <button
        onClick={() => {
          console.log(query.keys());
        }}
      >
        Get query
      </button> */}
      <div style={{ position: "relative", display: "flex", width: "100%" }}>
        <img
          style={{
            width: "100%",
            height: "431.59px",
            objectFit: "cover",
            zIndex: "1",
          }}
          src={HomeImage}
          alt=""
        />
        <img
          style={{
            position: "absolute",
            bottom: "0",
            right: 0,
            width: "50%",
            zIndex: "2",
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

      {data && (
        <Main
          data={data}
          // title={query.get('title')}
          // priceMin={query.get('priceMin')}
          // priceMax={query.get('priceMax')}
          // sort={query.get('sort')}
          // skip={query.get('skip')}
          // limit={query.get('limit')}
        />
      )}
    </div>
  );
};

export default Home;
