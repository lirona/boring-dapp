import React from "react";

const Loader = () => {
  return (
    <div className="flex gap-2 justify-center items-center w-full h-full text-primary">
      <i className="ri-loader-4-line animate-spin text-2xl"></i>
      <span className="text-2xl">Loading</span>
    </div>
  );
};

export default Loader;
