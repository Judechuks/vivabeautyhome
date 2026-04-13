import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import Logo from "../logo/Logo";
import CartPanel from "../common/CartPanel";
import ProfileMenu from "../common/ProfileMenu";
import { SVGICONS } from "../icon/SVGICON";

const Header = () => {
  const user = false;
  // const user = {
  //   firstName: "Emeke",
  //   lastName: "Monye",
  //   email: "emeke@gmail.com",
  // };
  const navigate = useNavigate();
  const location = useLocation();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const activePath = (path) => {
    const currentPath = location.pathname;

    if (path === "/") {
      return currentPath === "/";
    }

    return currentPath.startsWith(path);
  };

  const handleLogout = () => {
    console.log("Logged out Successfully");
  };

  // Nav links
  let deskTopNavLinks = [
    {
      name: "Home",
      path: "/",
      isActive: activePath("/"),
    },
    {
      name: "Products",
      path: "/products",
      isActive: activePath("/products"),
    },
    {
      name: "Contact Us",
      path: "/contact-us",
      isActive: activePath("/contact-us"),
    },
    {
      name: "About Us",
      path: "/about-us",
      isActive: activePath("/about-us"),
    },
  ];

  // Mobile NavLinks
  const noUserMenu = [
    {
      name: "Sign in",
      path: "/signin",
      auth: false,
      hideWhenLoggedIn: true,
      isActive: activePath("/signin"),
    },
    {
      name: "Sign up",
      path: "/signup",
      auth: false,
      hideWhenLoggedIn: true,
      isActive: activePath("/signup"),
    },
  ];
  const mobileNavLinks = [...deskTopNavLinks, ...noUserMenu];

  // Default Nav Link if no user [For Mobile]

  return (
    <header className="px-3 md:px-5 py-5 flex gap-2 items-center justify-between bg-gray-50 dark:bg-gray-900 dark:text-white shadow dark:shadow-md">
      <Logo />
      <div className="flex-1">
        {/* Desktop navigation */}
        <nav className="hidden md:mr-4 md:flex md:justify-end md:space-x-6">
          {deskTopNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm py-1.5 font-medium hover:text-brand-500 dark:hover:text-brand-500 ${
                link.isActive
                  ? "text-brand-500 dark:text-brand-500"
                  : "text-gray-500 dark:text-gray-300"
              }`}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center">
        {/* cart icon */}
        {/* {user && <CartPanel />} */}
        <CartPanel />

        {/* Profile dropdown */}
        {user ? (
          <ProfileMenu
            user={user}
            userRole={""}
            dashboardPath={"/admin"}
            handleLogout={handleLogout}
          />
        ) : (
          <aside className="hidden md:inline-flex items-center">
            <Link
              to="/signup"
              className="ml-4 text-sm py-1.5 font-medium text-gray-500 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-500">
              Sign up
            </Link>
            <Link
              to="/signin"
              className="mx-4 text-sm py-1.5 font-medium text-gray-500 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-500">
              Sign in
            </Link>
          </aside>
        )}

        {/* Theme Toggle - Desktop Only */}
        <div className="hidden md:block">
          <ThemeToggleButton />
        </div>
      </div>

      {/* Mobile Bottom Navigation Dock */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[60] pb-safe flex items-center justify-around h-16 px-2">
        {mobileNavLinks.slice(0, 3).map((link) => {
          if (link.hideWhenLoggedIn && user) return null;
          if (link.auth && !user) return null;
          // nav link icons
          let Icon;
          switch (link.name) {
            case "Home":
              Icon = SVGICONS.home;
              break;
            case "Products":
              Icon = <AiOutlineProduct className="w-6 h-6" />;
              break;
            case "Contact Us":
              Icon = SVGICONS.chat;
              break;
            case "About Us":
              Icon = SVGICONS.queue;
              break;
            case "Sign in":
              Icon = SVGICONS.login;
              break;
            case "Sign up":
              Icon = SVGICONS.signup;
              break;
            default:
              Icon = SVGICONS.circleInfo;
          }

          return (
            <button
              type="button"
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex flex-col items-center justify-center flex-1 max-w-[80px] h-full cursor-pointer ${
                link.isActive
                  ? "text-brand-500"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}>
              {Icon}
              <span className="text-[10px] sm:text-xs mt-1 font-medium truncate w-full text-center">
                {link.name}
              </span>
            </button>
          );
        })}

        {/* More Options trigger */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          className={`flex flex-col items-center justify-center flex-1 max-w-[80px] h-full cursor-pointer ${
            moreMenuOpen
              ? "text-brand-500"
              : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}>
          {SVGICONS.ellipsis}
          <span className="text-[10px] sm:text-xs mt-1 font-medium truncate w-full text-center">
            More
          </span>
        </button>
      </nav>

      {/* Slide-out or overlay for "More" Menu Options on mobile */}
      {moreMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm flex items-end justify-center pb-16"
          onClick={() => setMoreMenuOpen(false)}>
          <div
            className="w-full bg-white dark:bg-gray-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}>
            <div className="w-full p-5 max-h-[75vh] overflow-y-auto">
              <h3 className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 px-1">
                More Options
              </h3>
              <div className="flex flex-col">
                {mobileNavLinks.slice(2).map((link) => {
                  if (link.hideWhenLoggedIn && user) return null;
                  if (link.auth && !user) return null;
                  return (
                    <button
                      key={link.name}
                      onClick={() => navigate(link.path)}
                      className="text-left w-full py-3 px-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium my-1 cursor-pointer">
                      {link.name}
                    </button>
                  );
                })}

                {/* Inside More Menu Option if no user is logged in */}
                {/* {!user &&  (
                  <>
                    <button
                      onClick={() => handleNavClick("/login", false)}
                      className="text-left w-full py-3 px-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium my-1">
                      Login
                    </button>
                    <button
                      onClick={() => handleNavClick("/signup", false)}
                      className="text-left w-full py-3 px-4 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium my-1">
                      Signup
                    </button>
                  </>
                ) : null} */}

                {/* Toggle theme right inside the 'More' slider */}
                <div className="flex flex-col w-full py-4 px-4 rounded-2xl text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/50 mt-4 border border-gray-100 dark:border-gray-700/50">
                  <span className="font-semibold text-sm mb-3">Appearance</span>
                  <ThemeToggleButton inline={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
