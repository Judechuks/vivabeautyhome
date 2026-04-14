import React from "react";
import { Link } from "react-router-dom";

const BrandID = ({ tagline }) => {
  return (
    <section>
      <Link
        to="/"
        className={`flex items-center justify-center text-[1.75rem] md:text-4xl font-bold dark:text-gray-200 `}>
        <span className="text-brand-600">Viva</span> Beauty
      </Link>
      {tagline && (
        <p className="text-s font-semibold dark:text-white">
          Unlocking your inner beauty
        </p>
      )}
    </section>
  );
};

export default BrandID;
