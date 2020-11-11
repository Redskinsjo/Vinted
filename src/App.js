import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Offer from "./containers/Offer/index";
import Home from "./containers/Home/index";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await Axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/offer/:id">
          <Offer data={data.offers} isLoading={isLoading} />
        </Route>
        <Route path="/">
          <Home data={data} isLoading={isLoading} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
