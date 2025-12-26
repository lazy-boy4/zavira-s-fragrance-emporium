import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

/**
 * App - Root component with routing configuration
 * 
 * All routes are defined here for easy maintenance.
 * Backend integration points are documented in each page component.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
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
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
