import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className={`flex items-center text-xl font-bold dark:text-gray-200 `}>
      <span className="text-brand-600">Viva</span> Beauty
    </Link>
  );
};

export default Logo;
