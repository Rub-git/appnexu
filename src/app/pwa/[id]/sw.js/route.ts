import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const app = await prisma.appProject.findUnique({
            where: { id: id },
        });

        if (!app) {
            return new NextResponse('App not found', { status: 404 });
        }

        // Basic Service Worker template that caches the app's target URL
        // and provides basic offline fallback
        const swScript = `
const CACHE_NAME = 'instant-app-cache-v1-${id}';
const TARGET_URL = '${app.targetUrl}';

const urlsToCache = [
  '/',
  TARGET_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Attempt to cache the urls, but don't fail installation if it fails
        // due to cross-origin restrictions on targetUrl depending on CORS
        return cache.addAll(urlsToCache).catch(err => console.log('Partial cache:', err));
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // If response is valid, clone and put in cache
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback could go here
        });
      
      return cachedResponse || fetchPromise;
    })
  );
});
        `;

        return new NextResponse(swScript, {
            headers: {
                'Content-Type': 'application/javascript',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Service Worker Generation Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
