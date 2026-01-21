'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
    loginSchema,
    signupSchema,
    LoginFormData,
    SignupFormData,
} from '@/lib/validations';

/**
 * Auth Page - Handles both login and signup functionality
 * 
 * Security Features:
 * - Zod schema validation for all inputs
 * - Password strength requirements
 * - Supabase Auth integration
 */

function AuthContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, signup, isAuthenticated, isAdmin, signInWithGoogle } = useAuth();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    // Get redirect path from query params
    const redirectTo = searchParams.get('redirectTo') || '/';

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            if (isAdmin()) {
                router.replace('/admin');
            } else {
                router.replace(redirectTo);
            }
        }
    }, [isAuthenticated, isAdmin, router, redirectTo]);

    // Login form
    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    // Signup form
    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            newsletter: true,
            terms: false,
        },
    });

    const onLogin = async (data: LoginFormData) => {
        const result = await login(data.email, data.password);

        if (result.success) {
            toast({
                title: 'Welcome back',
                description: 'You have been signed in successfully.',
            });
            router.push(redirectTo);
        } else {
            toast({
                title: 'Sign in failed',
                description: result.error || 'Invalid credentials',
                variant: 'destructive',
            });
        }
    };

    const onSignup = async (data: SignupFormData) => {
        const result = await signup({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        });

        if (result.success) {
            toast({
                title: 'Account created',
                description: 'Welcome to Zavira! Please check your email to verify your account.',
            });
            router.push(redirectTo);
        } else {
            toast({
                title: 'Registration failed',
                description: result.error || 'Could not create account',
                variant: 'destructive',
            });
        }
    };

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    return (
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
                            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email Address</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        {...loginForm.register('email')}
                                        className="bg-card border-border"
                                        autoComplete="email"
                                    />
                                    {loginForm.formState.errors.email && (
                                        <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="login-password">Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            {...loginForm.register('password')}
                                            className="bg-card border-border pr-10"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {loginForm.formState.errors.password && (
                                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={loginForm.watch('remember') ?? false}
                                        onCheckedChange={(checked) => loginForm.setValue('remember', Boolean(checked))}
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
                                    disabled={loginForm.formState.isSubmitting}
                                >
                                    {loginForm.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Signup Tab */}
                        <TabsContent value="signup">
                            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="First"
                                            {...signupForm.register('firstName')}
                                            className="bg-card border-border"
                                            autoComplete="given-name"
                                        />
                                        {signupForm.formState.errors.firstName && (
                                            <p className="text-sm text-destructive">{signupForm.formState.errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Last"
                                            {...signupForm.register('lastName')}
                                            className="bg-card border-border"
                                            autoComplete="family-name"
                                        />
                                        {signupForm.formState.errors.lastName && (
                                            <p className="text-sm text-destructive">{signupForm.formState.errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email Address</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        {...signupForm.register('email')}
                                        className="bg-card border-border"
                                        autoComplete="email"
                                    />
                                    {signupForm.formState.errors.email && (
                                        <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="signup-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Minimum 8 characters"
                                            {...signupForm.register('password')}
                                            className="bg-card border-border pr-10"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {signupForm.formState.errors.password && (
                                        <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Must contain uppercase, lowercase, and a number
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        {...signupForm.register('confirmPassword')}
                                        className="bg-card border-border"
                                        autoComplete="new-password"
                                    />
                                    {signupForm.formState.errors.confirmPassword && (
                                        <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="newsletter"
                                            checked={signupForm.watch('newsletter') ?? false}
                                            onCheckedChange={(checked) => signupForm.setValue('newsletter', Boolean(checked))}
                                        />
                                        <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                                            Subscribe to our newsletter for exclusive offers
                                        </Label>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Checkbox
                                            id="terms"
                                            checked={signupForm.watch('terms') ?? false}
                                            onCheckedChange={(checked) => signupForm.setValue('terms', Boolean(checked))}
                                        />
                                        <div>
                                            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                                                I agree to the{' '}
                                                <Link href="/terms" className="underline hover:text-foreground">
                                                    Terms of Service
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy" className="underline hover:text-foreground">
                                                    Privacy Policy
                                                </Link>
                                            </Label>
                                            {signupForm.formState.errors.terms && (
                                                <p className="text-sm text-destructive mt-1">{signupForm.formState.errors.terms.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="luxury"
                                    size="xl"
                                    className="w-full"
                                    disabled={signupForm.formState.isSubmitting}
                                >
                                    {signupForm.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
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

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                            Google
                        </Button>
                        <Button variant="outline" className="w-full" disabled>
                            Apple
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                        Apple Sign-in coming soon
                    </p>
                </div>
            </section>
        </main>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
}
