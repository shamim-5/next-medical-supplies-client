"use client";

import FormAntdPatch from "../shared/FormAntdPatch";

interface IStoreFormPatchProps {
  id: string | undefined;
};

const StoreFormPatch: React.FC<IStoreFormPatchProps> = ({ id }) => {
  const routes = sessionStorage.getItem("routes");

  return (
    <>
      <h2 className="text-primary-dark text-2xl md:text-3xl lg:text-4xl uppercase font-semibold mb-4">
        Update store products
      </h2>
      <FormAntdPatch id={id} routes={routes} />
    </>
  );
};

export default StoreFormPatch;
