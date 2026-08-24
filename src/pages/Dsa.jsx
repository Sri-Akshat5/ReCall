import React from "react";
import DsaPractice from "../components/dsa/DsaPractice";

export const Dsa = ({ globalSearchTerm, setGlobalSearchTerm }) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <DsaPractice
        globalSearchTerm={globalSearchTerm}
        setGlobalSearchTerm={setGlobalSearchTerm}
      />
    </div>
  );
};

export default Dsa;
