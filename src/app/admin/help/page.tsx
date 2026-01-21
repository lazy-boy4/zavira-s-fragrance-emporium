import Link from 'next/link';
import {
    HelpCircle,
    BookOpen,
    MessageCircle,
    Mail,
    ExternalLink,
    FileText,
    Video,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const helpResources = [
    {
        icon: BookOpen,
        title: 'Documentation',
        description: 'Comprehensive guides for all features',
        href: '#',
    },
    {
        icon: Video,
        title: 'Video Tutorials',
        description: 'Step-by-step video walkthroughs',
        href: '#',
    },
    {
        icon: FileText,
        title: 'API Reference',
        description: 'Technical documentation for developers',
        href: '#',
    },
    {
        icon: Zap,
        title: 'Quick Start Guide',
        description: 'Get up and running in minutes',
        href: '#',
    },
];

const faqs = [
    {
        question: 'How do I add a new product?',
        answer: 'Navigate to Products → Add Product and fill in the required fields.',
    },
    {
        question: 'How do I process a refund?',
        answer: 'Go to Orders, find the order, and click the refund button.',
    },
    {
        question: 'How do I set up shipping zones?',
        answer: 'Visit Settings → Shipping to configure rates by region.',
    },
    {
        question: 'How do I export my data?',
        answer: 'Most pages have an Export button in the header to download CSV files.',
    },
];

/**
 * Help & Support Page
 */
export default function HelpPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-display tracking-wider">Help & Support</h1>
                <p className="text-muted-foreground mt-1">
                    Get help and find answers to common questions
                </p>
            </div>

            {/* Contact Support */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <MessageCircle className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-display text-lg">Need help?</h3>
                                <p className="text-muted-foreground">
                                    Our support team is available 24/7 to assist you.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Mail className="h-4 w-4" />
                                Email Support
                            </Button>
                            <Button className="gap-2">
                                <MessageCircle className="h-4 w-4" />
                                Live Chat
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Help Resources */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {helpResources.map((resource) => (
                    <Card key={resource.title} className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardContent className="p-6">
                            <resource.icon className="h-8 w-8 text-muted-foreground mb-4" />
                            <h3 className="font-medium mb-1">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            <Button variant="link" className="p-0 mt-2 h-auto gap-1">
                                Learn more <ExternalLink className="h-3 w-3" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* FAQs */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-display tracking-wider flex items-center gap-2">
                        <HelpCircle className="h-5 w-5" />
                        Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="space-y-2">
                                <h4 className="font-medium">{faq.question}</h4>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Keyboard Shortcuts */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-display tracking-wider">Keyboard Shortcuts</CardTitle>
                    <CardDescription>Speed up your workflow</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 md:grid-cols-2">
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">Quick search</span>
                            <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘ K</kbd>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">New product</span>
                            <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘ N</kbd>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">Save changes</span>
                            <kbd className="px-2 py-1 bg-background border rounded text-xs">⌘ S</kbd>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">Go to dashboard</span>
                            <kbd className="px-2 py-1 bg-background border rounded text-xs">G D</kbd>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
