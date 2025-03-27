import { AuthProvider } from "./components/contexts/AuthContext";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Sell from "./components/sellProduct";
import ProductDetail from "./components/pages/productDetail";
import Products from "./components/products";
import BuyNow from "./components/pages/buy";
import SellerDashboard from "./components/pages/sellerDash";
import ScrollToTop from "./components/scrollToTop";
import SearchResults from "./components/searchresult";
import PrivateRoute from "./components/PrivateRoute";
import Contact from "./components/pages/contact";
import About from "./components/about";
import HelpFAQ from "./components/help";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppRoutes() {
  const location = useLocation();

  // Define the pages that should NOT have a layout
  const noLayoutPages = ["/login", "/signup", "/sell", "/seller-dashboard", "/buy","/contact","/about","/help"
  ];

  // Check if the current path is in the noLayoutPages list
  const isNoLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route
            path="/buy"
            element={
              <PrivateRoute>
                <BuyNow />
              </PrivateRoute>
            }
          />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/help" element={<HelpFAQ />} />

        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:category/:subcategory" element={<Products />} />
            <Route path="/search" element={<SearchResults />} />

          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
