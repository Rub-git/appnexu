import Link from 'next/link';
import { Smartphone } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                        <Smartphone size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        InstantApp
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-black"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
