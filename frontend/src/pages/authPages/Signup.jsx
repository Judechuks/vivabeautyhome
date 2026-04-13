import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Input from "../../components/form/input/InputField";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import HomeAndTheme from "../../components/common/HomeAndTheme";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="flex itemscenter min-hscreen p6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xlmx-auto overflow-hidden rounded-lg shadow-xl">
        <section className="flex flex-col min-h-screen overflow-y-auto md:flex-row">
          <article className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="./src/assets/img/create-account-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="./src/assets/img/create-account-office-dark.jpeg"
              alt="Office"
            />
          </article>
          <article className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full">
              <h1 className="mb-5 md:mb-7 text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="inline-block mb-2 not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Email<span className="text-error-500">*</span>
                </label>
                <Input type="email" id="email" placeholder="Enter your Email" />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="inline-block mt-4 mb-2 not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Password<span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="pr-[62px]"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="inline-block mt-4 mb-2  not-first:text-gray-700 dark:text-gray-400 cursor-pointer">
                  Confirm Password<span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="pr-[62px]"
                    id="confirmPassword"
                    placeholder="Re-enter your Password"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400 cursor-pointer"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <FaRegEye className="size-5" />
                    ) : (
                      <FaRegEyeSlash className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="block w-full px-4 py-3 mt-8 text-lg font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple cursor-pointer">
                Create account
              </button>
              <hr className="my-8 dark:text-gray-600" />
              <p className="mt-4">
                <Link
                  to="/signin"
                  className="text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline">
                  Have an account? Login
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

export default SignUp;
