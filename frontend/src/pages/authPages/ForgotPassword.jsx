import { Link } from "react-router-dom";
import Input from "../../components/form/input/InputField";
import HomeAndTheme from "../../components/common/HomeAndTheme";

const ForgotPassword = () => {
  return (
    <main className="flex min-hscreen p6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xlmx-auto overflow-hidden rounded-lg shadow-xl">
        <section className="flex flex-col min-h-screen poverflow-y-auto md:flex-row">
          <article className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="./src/assets/img/forgot-password-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="./src/assets/img/forgot-password-office-dark.jpeg"
              alt="Office"
            />
          </article>
          <article className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full">
              <h1 className="mb-5 md:mb-7 text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
                Forgot password
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="inline-block mb-2 not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Email<span className="text-error-500">*</span>
                </label>
                <Input type="email" id="email" placeholder="Enter your Email" />
              </div>

              <button
                type="submit"
                className="block w-full px-4 py-3 mt-8 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple cursor-pointer">
                Recover password
              </button>
              <hr className="my-8 dark:text-gray-600" />
              <p className="mt-2">
                <Link
                  to="/signin"
                  className="text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Remembered password? Log in
                </Link>
              </p>
              <p className="mt-2">
                <Link
                  to="/signup"
                  className="text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Create account
                </Link>
              </p>
            </form>
          </article>
        </section>
      </div>

      {/* home and theme toggle button */}
      <HomeAndTheme />
    </main>
  );
};

export default ForgotPassword;
