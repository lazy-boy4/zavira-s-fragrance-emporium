'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import * as fpixel from '@/lib/fpixel';

const FacebookPixelEvents = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        fpixel.pageview();
    }, [pathname, searchParams]);

    return null;
};

export const FacebookPixel = () => {
    // Only render validation locally to prevent errors, but usually checking ID presence is enough
    // In dev, we might not have the ID, but that shouldn't crash app

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fpixel.FB_PIXEL_ID || ""}'); 
            fbq('track', 'PageView');
          `,
                }}
            />
            <Suspense fallback={null}>
                <FacebookPixelEvents />
            </Suspense>
        </>
    );
};
