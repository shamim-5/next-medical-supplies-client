"use client";

import React from "react";
import FeaturedCard from "../cards/FeaturedCard";

const FeaturedServices = () => {
  return (
    <div className="my-4 md:my-6 lg:my-9">
      <h2 className="text-primary-dark text-4xl uppercase font-semibold mb-4">Featured Services</h2>
      <div>
        <FeaturedCard />
      </div>
    </div>
  );
};

export default FeaturedServices;
