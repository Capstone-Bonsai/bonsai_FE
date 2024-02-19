import React from "react";
import { BeatLoader } from "react-spinners";

function Loading({ loading }) {
  return (
    <div
      className={`w-[100%] h-[100%] absolute inset-0 z-auto flex justify-center items-center ${
        loading ? "bg-[#ffffff] opacity-90" : "hidden"
      }`}
    >
      <div className="flex justify-center">
        <BeatLoader color="#3a9943" loading={loading} size={15} />
      </div>
    </div>
  );
}

export default Loading;
