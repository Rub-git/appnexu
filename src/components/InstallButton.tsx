'use client';
import { Download } from 'lucide-react';

export default function InstallButton({ appId }: { appId: string }) {
    const handleInstallClick = async () => {
        try {
            // First we need to dynamically inject the generated manifest into the DOM
            const manifestLink = document.createElement('link');
            manifestLink.rel = 'manifest';
            manifestLink.href = `/pwa/${appId}/manifest.json`;
            // Remove any existing manifest links
            document.querySelectorAll('link[rel="manifest"]').forEach(el => el.remove());
            document.head.appendChild(manifestLink);

            // Fetch the generated Service Worker
            if ('serviceWorker' in navigator) {
                const swRegistration = await navigator.serviceWorker.register(`/pwa/${appId}/sw.js`);
                console.log('ServiceWorker registered with scope:', swRegistration.scope);
                alert("PWA successfully staged! If your browser supports it, you should see an install prompt shortly.");
            } else {
                alert("Service Workers are not supported in this browser.");
            }

            // Note: In a real environment, the browser fires the 'beforeinstallprompt' event automatically 
            // once it verifies the valid manifest and service worker. We mock the UX here.

        } catch (err) {
            console.error('PWA installation failed', err);
            alert("Installation failed. Please check the console for details.");
        }
    };

    return (
        <button
            onClick={handleInstallClick}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
            <Download className="-ml-1 mr-2 h-4 w-4" />
            Install App
        </button>
    );
}
