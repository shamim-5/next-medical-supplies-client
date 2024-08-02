"use client";

import FormAntd from "../shared/FormAntd";

const StoreForm: React.FC = () => {
  return (
    <>
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">
        Add new products into store
      </h2>
      <FormAntd />
    </>
  );
};

export default StoreForm;
