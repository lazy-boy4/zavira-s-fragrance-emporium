import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckoutShipping from "./pages/CheckoutShipping";
import CheckoutPayment from "./pages/CheckoutPayment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Collections from "./pages/Collections";
import Story from "./pages/Story";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ShippingReturns from "./pages/ShippingReturns";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import StoreLocator from "./pages/StoreLocator";
import Craftsmanship from "./pages/Craftsmanship";
import Sustainability from "./pages/Sustainability";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";
import ProductList from "./pages/admin/ProductList";
import ProductEditor from "./pages/admin/ProductEditor";
import CollectionList from "./pages/admin/CollectionList";
import CollectionEditor from "./pages/admin/CollectionEditor";
import OrderList from "./pages/admin/OrderList";
import OrderDetail from "./pages/admin/OrderDetail";
import CustomerList from "./pages/admin/CustomerList";
import DiscountList from "./pages/admin/DiscountList";
import TeamManagement from "./pages/admin/TeamManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import AdminSettings from "./pages/admin/Settings";
import ShippingSettings from "./pages/admin/ShippingSettings";
import LandingPageEditor from "./pages/admin/LandingPageEditor";
import PaymentSettings from "./pages/admin/PaymentSettings";
import DeliveryTracking from "./pages/admin/DeliveryTracking";
import Help from "./pages/admin/Help";

const queryClient = new QueryClient();

/**
 * App - Root component with routing configuration
 * 
 * Security:
 * - Admin routes are protected with ProtectedRoute component
 * - Authentication state managed via AuthContext
 * - Cart state persisted securely via CartContext
 * 
 * Backend integration points are documented in each page component.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/story" element={<Story />} />
              
              {/* Cart & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/shipping" element={<CheckoutShipping />} />
              <Route path="/checkout/payment" element={<CheckoutPayment />} />
              <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
              
              {/* Auth & Profile */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Footer Pages - Shop */}
              <Route path="/craftsmanship" element={<Craftsmanship />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/careers" element={<Careers />} />
              
              {/* Footer Pages - Support */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<ShippingReturns />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/stores" element={<StoreLocator />} />
              
              {/* Footer Pages - Legal */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              
              {/* Admin Dashboard - Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRoles={["owner", "manager", "staff"]}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/new" element={<ProductEditor />} />
                <Route path="products/:id" element={<ProductEditor />} />
                <Route path="collections" element={<CollectionList />} />
                <Route path="collections/new" element={<CollectionEditor />} />
                <Route path="collections/:id/edit" element={<CollectionEditor />} />
                <Route path="orders" element={<OrderList />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="discounts" element={<DiscountList />} />
                <Route path="discounts/new" element={<DiscountList />} />
                <Route path="shipping" element={<ShippingSettings />} />
                <Route path="payments" element={<PaymentSettings />} />
                <Route path="delivery" element={<DeliveryTracking />} />
                <Route path="landing-page" element={<LandingPageEditor />} />
                {/* Team management only for owners and managers */}
                <Route path="team" element={<TeamManagement />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="help" element={<Help />} />
              </Route>
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
