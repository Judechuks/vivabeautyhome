import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "../logo/Logo";

const Footer = () => {
  const links = [
    {
      title: "Quick Links",
      items: [
        { title: "About Us", path: "/about-us" },
        { title: "Contact Us", path: "/contact-us" },
        { title: "Products", path: "/products" },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "FAQs", path: "/faqs" },
        { title: "Privacy Policy", path: "/privacy-policy" },
        { title: "Terms of Service", path: "/terms-of-service" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 dark:text-white py-6 md:pt-12 border-t-2 border-t-gray-300 dark:border-t-gray-700">
      {/* Hide footer on mobile devices, show these details in the about us page instead */}
      <div className="hidden md:block containr mx-auto px-3 md:px-5">
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">
              <Logo />
            </h3>
            <p className="mb-4">
              Giving you the best haircare and skincare services and products of
              your dreams. We make you proud of your body while glowing with
              elegance.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:border-primary-color hover:text-primary-color dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:border-primary-color hover:text-primary-color dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:border-primary-color hover:text-primary-color dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:border-primary-color hover:text-primary-color dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {links.map((section, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="hover:text-primary-color">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaPhone className="mr-3 flex-shrink-0" />
                <a
                  href="tel:+2348123456789"
                  className="hover:text-primary-color">
                  +234 81 666 777 55
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 flex-shrink-0" />
                <a
                  href="mailto:contact@dozages.com"
                  className="hover:text-primary-color">
                  info@vivabeautyhome.com
                </a>
              </li>
              <li className="flex items-center">
                <FaClock className="mr-3 flex-shrink-0" />
                <span>Mon-Sat: 8AM - 7PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 px-3 border-t border-t-gray-300 dark:border-gray-700 text-center">
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} VivaBeauty Home. All rights
            reserved.
          </p>
        </div>
      </div>
      {/* <div className="md:hidden px-3 pb-16 text-center">
        <p className="text-sm ">
          &copy; {new Date().getFullYear()} VivaBeauty Home. All rights
          reserved.
        </p>
      </div> */}
    </footer>
  );
};

export default Footer;
