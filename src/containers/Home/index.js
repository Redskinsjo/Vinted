import React from "react";
import Header from "../../components/Header";
import Main from "../../components/Main";

const Home = ({ data, isLoading }) => {
  return (
    <div>
      <Header />
      <Main data={data.offers} isLoading={isLoading} />
    </div>
  );
};

export default Home;
