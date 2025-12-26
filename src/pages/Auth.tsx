import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Auth Page - Handles both login and signup functionality
 * 
 * Features:
 * - Tabbed interface for login/signup
 * - Password visibility toggle
 * - Form validation ready for Zod integration
 * - Remember me option
 * - Social auth placeholders
 * 
 * Backend Integration Notes:
 * - Replace handleLogin with API call to POST /api/auth/login
 * - Replace handleSignup with API call to POST /api/auth/register
 * - Store JWT token in httpOnly cookie or secure storage
 */
const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: true,
    terms: false,
  });

  /**
   * Handle login form submission
   * TODO: Integrate with backend API
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call - replace with actual auth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // TODO: Call API and handle response
    // const response = await fetch('/api/auth/login', {...})
    
    setIsLoading(false);
    navigate("/profile");
  };

  /**
   * Handle signup form submission
   * TODO: Integrate with backend API
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (!signupData.terms) {
      alert("Please accept the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - replace with actual auth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // TODO: Call API and handle response
    // const response = await fetch('/api/auth/register', {...})
    
    setIsLoading(false);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-md">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
                Welcome
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account or create a new one
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="uppercase tracking-wider text-xs">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="uppercase tracking-wider text-xs">
                  Create Account
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-card border-border"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="bg-card border-border pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.remember}
                      onCheckedChange={(checked) => setLoginData({ ...loginData, remember: !!checked })}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="xl" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        className="bg-card border-border"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        className="bg-card border-border"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="bg-card border-border"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="bg-card border-border pr-10"
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="bg-card border-border"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="newsletter"
                        checked={signupData.newsletter}
                        onCheckedChange={(checked) => setSignupData({ ...signupData, newsletter: !!checked })}
                      />
                      <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                        Subscribe to our newsletter for exclusive offers
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={signupData.terms}
                        onCheckedChange={(checked) => setSignupData({ ...signupData, terms: !!checked })}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                        I agree to the{" "}
                        <Link to="/terms" className="underline hover:text-foreground">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="underline hover:text-foreground">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="xl" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Placeholders */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full" disabled>
                Google
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Apple
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Social login coming soon
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
