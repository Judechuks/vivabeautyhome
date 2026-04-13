import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";

const NotFound = () => {
  return (
    <main
      className={`h-screen flex flex-col justify-center overflow-y-auto md:flex-row bg-404 text-gray-25`}>
      {/* <article className="h-32 md:h-auto md:w-1/2 bg-amber400"></article> */}
      <article className="flex flex-col items-center justify-center p-6 sm:p-12 md:w-1/2">
        <h2 className="text-3xl font-bold">Oops!</h2>
        <h3 className="text-8xl font-black my-4">404</h3>
        <h4 className="text-xl font-black mb-4">PAGE NOT FOUND</h4>
        <p className="font-semibold text-center">
          Sorry but the page you are looking for does not exist, have been
          removed, has its name changed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="text-lg font-semibold px-3 py-1 mt-4 rounded bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 transition">
          <span className="flex gap-3 items-center">
            <HiOutlineHome /> Homepage
          </span>
        </Link>
      </article>
    </main>
  );
};

export default NotFound;
