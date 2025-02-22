import React from "react";
import { Link } from "react-router-dom";

import Hero from "./Hero";
import Slider from "./Slider";
import Categories from "./Categories";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Slider Section */}
      <Slider />

      {/* Categories Section */}
      <Categories />
    </div>
  );
};

export default Home;
