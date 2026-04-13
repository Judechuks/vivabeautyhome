import { Route, Routes } from "react-router-dom";
import PublicPageLayout from "../pages/layout/PublicPageLayout";
import SignIn from "../pages/authPages/SignIn";
import SignUp from "../pages/authPages/Signup";
import NotFound from "../pages/authPages/NotFound";
import Home from "../pages/landingPage/Home";
import ForgotPassword from "../pages/authPages/ForgotPassword";
import Products from "../pages/landingPage/Products";
import ContactUs from "../pages/landingPage/ContactUs";
import AboutUs from "../pages/landingPage/AboutUs";
import FAQs from "../pages/resources/FAQs";
import PrivacyPolicy from "../pages/resources/PrivacyPolicy";
import TermsOfService from "../pages/resources/TermsOfService";
import CartPage from "../pages/order/CartPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<PublicPageLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
      </Route>
      {/* General But Protected Routes */}
      {/* <Route path="/*" element={<GeneralProtectedRoutes />} /> */}
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
