import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CartPanel = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative size-6 p-1 mr-4 sm:ml-4 grid place-items-center cursor-pointer"
      onClick={() => navigate("/cart")}>
      <FaCartShopping className="text-xl" />
      <span className="absolute -right-4 -top-3 w-6 h-6 rounded-full grid place-items-center font-semibold text-sm text-white bg-amber-700">
        05
      </span>
    </div>
  );
};

export default CartPanel;
