import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  FaUserCircle,
  FaUser,
  FaKey,
  FaCog, // Added Cog icon
  FaSignOutAlt,
} from "react-icons/fa";

const ProfileMenu = ({ user, userRole, dashboardPath, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="mx-3 relative">
      <div>
        <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-color transition-transform hover:scale-105">
          <span className="sr-only">Open user menu</span>
          {user?.profilePictureUrl ? (
            <img
              className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-primary-color transition-colors cursor-pointer"
              src={user.profilePictureUrl}
              alt="User profile"
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 cursor-pointer">
              <FaUserCircle className="h-7 w-7" />
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="fixed left-4 right-4 top-[4.5rem] w-auto sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-56 rounded-xl shadow-xl py-2 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`${dashboardPath}/profile`}
                  className={`${
                    active
                      ? "bg-gray-50 dark:bg-gray-700/50 text-primary-color"
                      : "text-gray-700 dark:text-gray-200"
                  } flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}>
                  <FaUser className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-color" />
                  Your Profile
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate("/change-password")}
                  className={`${
                    active
                      ? "bg-gray-50 dark:bg-gray-700/50 text-primary-color"
                      : "text-gray-700 dark:text-gray-200"
                  } flex items-center w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer`}>
                  <FaKey className="mr-3 h-4 w-4 text-gray-400" />
                  Change Password
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="p-1 border-t border-gray-100 dark:border-gray-700 mt-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={async () => {
                    await handleLogout();
                    navigate("/login");
                  }}
                  className={`${
                    active
                      ? "bg-red-50 dark:bg-red-900/20 text-red-600"
                      : "text-gray-700 dark:text-gray-200"
                  } flex items-center w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer`}>
                  <FaSignOutAlt
                    className={`mr-3 h-4 w-4 ${active ? "text-red-500" : "text-gray-400"}`}
                  />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
