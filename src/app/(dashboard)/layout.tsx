import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Settings, Smartphone, LogOut } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row dark:bg-black">
            {/* Sidebar */}
            <aside className="border-r border-gray-200 bg-white md:w-64 md:flex-shrink-0 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center px-6">
                        <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                                <Smartphone size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                InstantApp
                            </span>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="space-y-1 px-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
                            >
                                <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                My Apps
                            </Link>
                            <Link
                                href="/dashboard/create"
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <PlusCircle className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                Create New App
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <Settings className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                                Settings
                            </Link>
                        </nav>
                    </div>

                    <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                        <Link
                            href="/"
                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                            Sign out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
