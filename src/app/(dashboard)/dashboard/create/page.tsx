'use client'; // This is needed to handle form state with React
import { useState } from 'react';
import { ArrowRight, Link as LinkIcon, Loader2, Smartphone, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateAppPage() {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const router = useRouter();

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsAnalyzing(true);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                let errorMsg = 'Failed to analyze URL';
                try {
                    const result = await response.json();
                    errorMsg = result.error || errorMsg;
                } catch {
                    // Ignore json parse error and keep default message if it's returning HTML
                }
                throw new Error(errorMsg);
            }

            const result = await response.json();
            console.log("Analysis Result:", result.data);

            // Call generate API to create the DB record
            const generateResponse = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result.data),
            });

            if (!generateResponse.ok) {
                let genErrorMsg = 'Failed to generate app record';
                try {
                    const genResult = await generateResponse.json();
                    genErrorMsg = genResult.error || genErrorMsg;
                } catch {
                    // Ignore json parse error
                }
                throw new Error(genErrorMsg);
            }

            const generateResult = await generateResponse.json();

            // Navigate to real preview ID
            router.push(`/dashboard/preview/${generateResult.data.id}`);

        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create New App</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Enter the URL of the website you want to convert into an installable mobile app.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
                <div className="p-8">
                    <form onSubmit={handleAnalyze} className="space-y-6">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Website URL
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="url"
                                    name="url"
                                    id="url"
                                    className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-lg sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500"
                                    placeholder="https://example.com"
                                    required
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={isAnalyzing}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Make sure the URL starts with https://
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isAnalyzing || !url}
                            className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:hover:bg-primary"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Analyzing website metadata...
                                </>
                            ) : (
                                <>
                                    Generate App
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-50 px-8 py-6 dark:bg-gray-800/50">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-200">What happens next?</h4>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-start">
                            <div className="flex-shrink-0">
                                <Globe className="h-5 w-5 text-gray-400" />
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                We'll scan the URL for metadata like titles, colors, and icons.
                            </p>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0">
                                <Loader2 className="h-5 w-5 text-gray-400" />
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                Our engine automatically generates the required PWA manifest and service workers.
                            </p>
                        </li>
                        <li className="flex items-start">
                            <div className="flex-shrink-0">
                                <Smartphone className="h-5 w-5 text-gray-400" />
                            </div>
                            <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                You'll get a preview of your app and a custom link to install it on your device.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
