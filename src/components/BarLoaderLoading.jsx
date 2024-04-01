import React from "react";
import { BarLoader } from "react-spinners";

function BarLoaderLoading({ barLoaderLoading }) {
  return (
    <div className="flex justify-center ">
      <BarLoader width="100%" color="#3a9943" loading={barLoaderLoading} />
    </div>
  );
}

export default BarLoaderLoading;
