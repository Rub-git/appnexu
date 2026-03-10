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

        const manifest = {
            name: app.appName,
            short_name: app.shortName || app.appName,
            start_url: app.targetUrl,
            display: 'standalone',
            theme_color: app.themeColor || '#ffffff',
            background_color: '#ffffff',
            icons: [
                {
                    src: app.iconUrls[0] || '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any maskable'
                },
                {
                    src: app.iconUrls[0] || '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any maskable'
                }
            ]
        };

        return new NextResponse(JSON.stringify(manifest), {
            headers: {
                'Content-Type': 'application/manifest+json',
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error) {
        console.error('Manifest Generation Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
