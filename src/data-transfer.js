const axios = require('axios');

const fetchData = () => {
  axios
    .get('https://lereacteur-vinted-api.herokuapp.com/offers') // fetch the data on the server (this Reacteur)
    .then((response) => {
      console.log('REPONSE NIVEAU 1: ', 'Les offres du Reacteur');
      const offers = response.data.offers;
      for (let i = 0; i < offers.length; i++) {
        const {
          product_details,
          product_pictures,
          product_name,
          product_description,
          product_price,
          product_image,
        } = offers[i];
        // foreach offer , publish one new offer to my server (myGithub)
        axios({
          method: 'post',
          url: 'https://lereacteurvinted.herokuapp.com/offer/publish',
          headers: {
            authorization:
              'O7VBHpfup6HFBsBL9jEgAyc9C72n9SOC6XaeOMkYd52jE3xokfWhwhojln9Y5vZE',
          },
          data: {
            product_details,
            product_pictures,
            product_name,
            product_description,
            product_price,
            product_image,
          },
        })
          .then((response) => {
            console.log('REPONSE NIVEAU 2 numéro' + i + ' : ', response.data);
          })
          .catch((error) => console.log('ERROR NIVEAU 2: ', error.message));
      }
    })
    .catch((error) => console.log('ERROR NIVEAU 1: ', error.message));
  //   const data = response.data.offers;
  //   const dataUpdated = data.map((offer) => {
  //     return offer.populate({ path: 'owner' });
  //   });
  //   console.log(data);
};

fetchData();
