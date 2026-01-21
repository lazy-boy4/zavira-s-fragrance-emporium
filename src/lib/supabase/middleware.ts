import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                        supabaseResponse.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Do not run on static assets
    if (request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.includes('.') ||
        request.nextUrl.pathname.startsWith('/api/webhook')) {
        // Skip auth for webhooks too, usually handled inside the route
        return supabaseResponse
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
    const isProfileRoute = request.nextUrl.pathname.startsWith('/profile');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isCheckoutRoute = request.nextUrl.pathname.startsWith('/checkout');

    // Protected client routes (Profile, Checkout)
    if (
        !user &&
        !isAuthRoute &&
        (isCheckoutRoute || isProfileRoute)
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/auth';
        url.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // Admin routes protection
    if (isAdminRoute) {
        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth';
            url.searchParams.set('redirectTo', request.nextUrl.pathname);
            return NextResponse.redirect(url);
        }

        const role = user.user_metadata?.role || user.app_metadata?.role;
        if (role !== 'admin' && role !== 'owner' && role !== 'manager') {
            // Redirect to home if not authorized
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
    // creating a new Response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    return supabaseResponse
}
