import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollToTop from "./components/common/ScrollToTop";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
