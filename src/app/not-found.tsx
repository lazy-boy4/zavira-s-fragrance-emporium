import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <main className="pt-20">
            <section className="py-24 lg:py-32 bg-background min-h-[60vh] flex items-center">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-display text-8xl md:text-9xl font-medium mb-4 text-muted-foreground/20">
                        404
                    </h1>
                    <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="luxury" size="lg">
                                Return Home
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button variant="outline" size="lg">
                                Browse Shop
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
