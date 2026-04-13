import { Outlet } from "react-router-dom";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";

const PublicPageLayout = () => {
  return (
    <div className="page-layout grid min-h-dvh bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="px-3 md:px-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicPageLayout;
