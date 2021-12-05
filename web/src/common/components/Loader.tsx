import React from "react";
import loader from "../../assets/images/loader.svg";

const Loader: React.FC = () => {
  return (
    <>
      <div className="flex justify-center h-screen align-middle">
        <img src={loader} alt="Loading" className="w-2/12" />
      </div>
    </>
  );
};
export default Loader;
