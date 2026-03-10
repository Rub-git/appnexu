import Link from 'next/link';
import { ArrowRight, Smartphone, Zap, Shield, CheckCircle } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center pb-24 pt-32 text-center">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now available in public beta
        </div>

        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Turn your website into a <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            mobile app instantly.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          No coding required. Just enter your URL and we'll generate a fully compliant Progressive Web App ready for installation on any device.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-white transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
          >
            Start building for free
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-4 text-lg font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 sm:w-auto"
          >
            Learn more
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3" id="features">
          <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Generate your app in seconds with our automated extraction engine.</p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Smartphone size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Native Feel</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Installable on iOS and Android with custom splash screens and icons.</p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fully Secure</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">PWA compliant, ensuring a safe and reliable experience for your users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
