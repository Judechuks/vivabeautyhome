import { useNavigate } from "react-router-dom";
import { SVGICONS } from "../icon/SVGICON";
import ThemeTogglerTwo from "./ThemeTogglerTwo";

const HomeAndTheme = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed right-2 bottom-2 flex gap-2 items-center">
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center justify-center text-white transition-colors rounded-full size-12 bg-purple-500 hover:bg-purple-600 cursor-pointer">
        {SVGICONS.home}
      </button>
      <ThemeTogglerTwo />
    </div>
  );
};

export default HomeAndTheme;
