import Link from 'next/link';
import { ArrowLeft, Check, Download, ExternalLink, Settings2, Smartphone } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InstallButton from '@/components/InstallButton';

export default async function AppPreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch data from database
    const app = await prisma.appProject.findUnique({
        where: { id: id },
    });

    if (!app) {
        notFound();
    }

    // Map DB model to view model
    const mockApp = {
        name: app.appName,
        shortName: app.shortName || app.appName,
        url: app.targetUrl,
        themeColor: app.themeColor || '#ffffff',
        backgroundColor: '#ffffff', // Default for now
        status: 'Ready',
        id: app.id,
        icons: app.iconUrls,
    };

    const icons = typeof mockApp.icons === "string"
        ? mockApp.icons.split(",")
        : mockApp.icons || [];

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* Header */}
            <div className="flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <Link href="/dashboard" className="mb-2 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Apps
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {mockApp.name}
                    </h1>
                    <p className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        Source: <a href={mockApp.url} target="_blank" rel="noreferrer" className="ml-1 flex items-center text-primary hover:underline">{mockApp.url} <ExternalLink className="ml-1 h-3 w-3" /></a>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                        <Settings2 className="-ml-1 mr-2 h-4 w-4" />
                        Configure
                    </button>
                    <InstallButton appId={mockApp.id} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Col: Details & Checklist */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Details Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">App Configuration</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Details automatically extracted from your website.</p>
                        </div>
                        <div className="px-6 py-5">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">App Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{mockApp.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Short Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{mockApp.shortName}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme Color</dt>
                                    <dd className="mt-1 flex items-center text-sm text-gray-900 dark:text-white">
                                        <span className="mr-2 h-4 w-4 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: mockApp.themeColor }}></span>
                                        {mockApp.themeColor}
                                    </dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Background Color</dt>
                                    <dd className="mt-1 flex items-center text-sm text-gray-900 dark:text-white">
                                        <span className="mr-2 h-4 w-4 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: mockApp.backgroundColor }}></span>
                                        {mockApp.backgroundColor}
                                    </dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">App Icons</dt>
                                    <dd className="mt-2 flex flex-wrap gap-4">
                                        {icons.length > 0 ? (
                                            icons.map((icon: string, i: number) => (
                                                <div key={i} className="flex flex-col items-center gap-1">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={icon.trim()} alt={`Icon ${i + 1}`} className="h-12 w-12 rounded-xl border border-gray-200 object-cover shadow-sm bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-sm italic text-gray-400">No icons found. Defaults will be used.</span>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Checklist Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">PWA Readiness</h3>
                        </div>
                        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                            <li className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center">
                                    <Check className="mr-3 h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Valid HTTPS connection</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center">
                                    <Check className="mr-3 h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Web App Manifest generated</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center">
                                    <Check className="mr-3 h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Service Worker registered</span>
                                </div>
                            </li>
                            <li className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center">
                                    <Check className="mr-3 h-5 w-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Maskable icons validated</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Col: Device Preview */}
                <div className="flex flex-col items-center">
                    <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Mobile Preview</h3>

                    {/* iPhone Mockup wrapper purely CSS */}
                    <div className="relative mx-auto h-[600px] w-[300px] rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 shadow-xl dark:border-gray-800 dark:bg-gray-800">
                        {/* Notch */}
                        <div className="absolute left-1/2 top-0 z-20 h-[24px] w-[120px] -translate-x-1/2 rounded-b-2xl bg-gray-900 dark:bg-gray-800"></div>

                        {/* Screen Content */}
                        <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] bg-white dark:bg-black">
                            {/* Fake Chrome/Status bar match */}
                            <div
                                className="h-12 w-full pt-2 text-center text-[10px] font-medium text-white shadow-sm flex items-end justify-center pb-1"
                                style={{ backgroundColor: mockApp.themeColor }}
                            >
                                <span className="opacity-80">9:41</span>
                            </div>

                            <div className="h-[calc(100%-3rem)] w-full bg-white dark:bg-black">
                                <iframe
                                    src={mockApp.url}
                                    className="h-full w-full border-0"
                                    title={`${mockApp.name} Preview`}
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
