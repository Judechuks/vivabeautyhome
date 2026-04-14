import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa6";
import BgImage from "../../assets/img/404-bg.jpg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main
      className={`h-screen relative flex flex-col justify-center overflow-y-auto md:flex-row bg404 text-gray-25`}>
      {/* <article className="h-32 md:h-auto md:w-1/2 bg-amber400"></article> */}
      <img
        src={BgImage}
        alt="space background"
        className="h-full w-full object-cover"
      />
      <article className="flex flex-col items-center justify-center px-5 py-6 sm:p-12 w-full absolute inset-0 bg-black/70">
        <h2 className="text-3xl font-bold">Oops!</h2>
        <h3 className="text-8xl font-black my-4">404</h3>
        <h4 className="text-xl font-black mb-4">PAGE NOT FOUND</h4>
        <p className="font-semibold text-lg text-center w-full md:w-xl">
          Sorry but the page you are looking for does not exist, have been
          removed, has its name changed or is temporarily unavailable.
        </p>
        <div className="flex flex-col min-[380px]:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-lg font-semibold px-5 py-2.5 rounded bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 transition cursor-pointer">
            <span className="flex gap-3 items-center">
              <FaArrowLeft className="mr-2" /> Go Back
            </span>
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-lg font-semibold px-5 py-2.5 rounded bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 transition cursor-pointer">
            <span className="flex gap-3 items-center">
              <HiOutlineHome /> Home Page
            </span>
          </button>
        </div>
      </article>
    </main>
  );
};

export default NotFound;
