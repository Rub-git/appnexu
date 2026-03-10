import Link from 'next/link';
import { Plus, Smartphone, ExternalLink, MoreVertical } from 'lucide-react';

export default function DashboardPage() {
    // Mock data for MVP UI
    const apps = [
        {
            id: '1',
            name: 'My Store',
            url: 'https://example.com',
            date: 'Oct 12, 2026',
            status: 'Active',
            color: '#4F46E5',
        },
        {
            id: '2',
            name: 'Blog App',
            url: 'https://blog.example.com',
            date: 'Sep 28, 2026',
            status: 'Active',
            color: '#10B981',
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Apps</h1>
                <Link
                    href="/dashboard/create"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Create New App
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {apps.map((app) => (
                    <div
                        key={app.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md dark:bg-gray-900 dark:ring-gray-800"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
                                    style={{ backgroundColor: app.color }}
                                >
                                    <Smartphone size={24} />
                                </div>
                                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    <Link href={`/dashboard/preview/${app.id}`}>
                                        <span className="absolute inset-0" />
                                        {app.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    {app.url}
                                    <ExternalLink size={12} />
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Created on {app.date}</span>
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
