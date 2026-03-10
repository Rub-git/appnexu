import Navbar from '@/components/Navbar';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-black">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-black">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
                    &copy; {new Date().getFullYear()} InstantApp. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
