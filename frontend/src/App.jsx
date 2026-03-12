import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/*  CONTEXT  */
import { ShopProvider } from "./context/ShopContext";

/*  LAYOUTS  */
import UserLayout from "./layouts/UserLayout";
import ShopLayout from "./layouts/ShopLayout";

/*  USER PAGES  */
import Home from "./pages/user/Home";
import MenCategoryPage from "./pages/user/MenCategory";
import WomenCategory from "./pages/user/WomenCategory";
import KidsCategory from "./pages/user/KidsCategory";
import ShopCollectionPage from "./pages/user/ShopCollectionPage";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
// import CheckoutPage from "./layouts/Checkout";
import CheckoutPage from "./pages/user/Checkout";
import CollectionsPage from "./pages/user/Collections";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import UserOtp from "./pages/user/UserOtp";
import Favorites from "./pages/user/Favorites";
import AITry from "./pages/user/AITry";
import About from "./pages/user/About";
import Contactus from "./pages/user/Contactus";
import WeaversPage from "./pages/user/WeaversPage";
import FAQPage from "./pages/user/FAQPage";
import SustainabilityPage from "./pages/user/SustainabilityPage";
import Careers from "./pages/user/Careers";
import ShippingReturns from "./pages/user/ShippingReturns";
import PrivacyPolicy from "./pages/user/PrivacyPolicy";
import TermsOfService from "./pages/user/TermsOfService";
import OurPhilosophy from "./pages/user/OurPhilosophy";
import NotFound from "./pages/user/NotFound";

/*  USER DASHBOARD  */
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Profile from "./pages/dashboard/Profile";
import Orders from "./pages/dashboard/Orders";
import TrackOrder from "./pages/dashboard/TrackOrder";
import Address from "./pages/dashboard/Address";
import Invoices from "./pages/dashboard/Invoices";
import OrderDetails from "./pages/dashboard/OrderDetails";

/*  ADMIN AUTH  */
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";

/*  ADMIN PAGES  */
import AddProduct from "./pages/admin/AddProduct";

import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Payments from "./pages/admin/Payments";
import AdminProfile from "./pages/admin/Profiles";
// import CreateCustomer from "./pages/admin/CreateCustomer";
// import CreateOrder from "./pages/admin/CreateOrder";
import Dashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import OrderDetail from "./pages/admin/OrderDetail";
// import WhatsAppAutomation from "./pages/admin/WhatsAppAutomation";
import ScrollToTop from "./components/Home/ScrollToTop";
import Coupons from "./pages/admin/Coupons";
import { ShoppingCart } from "lucide-react";

const App = () => {
  const isAdminLoggedIn = localStorage.getItem("graphura_admin");

  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/*  USER ROUTES  */}
          <Route element={<UserLayout />}>
            <Route path="/aitry" element={<AITry />} />
          </Route>
          {/*  USER DASHBOARD  */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Orders />} />

            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
          {/*  SHOP ROUTES  */}
          <Route element={<ShopLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shopcollection" element={<ShopCollectionPage />} />
            <Route path="/men" element={<MenCategoryPage />} />
            <Route path="/women" element={<WomenCategory />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/ai-try-on" element={<AITry />} />
            <Route path="/kids" element={<KidsCategory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/shipping" element={<ShippingReturns />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/weavers" element={<WeaversPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/our-philosophy" element={<OurPhilosophy />} />
          </Route>

          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/user-otp" element={<UserOtp />} />
          <Route path="/notFound" element={<NotFound />} />

          {/*  ADMIN AUTH  */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/profiles" element={<AdminProfile />} />
          <Route path="/admin/coupons" element={<Coupons />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          

         
          {/* <Route path="/admin/whatsapp" element={<WhatsAppAutomation />} /> */}

          {/*  FALLBACK  */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
};
export default App;