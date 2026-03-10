import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // For the MVP, we create a mock user if there isn't one.
        // In the future this will use the session from next-auth/clerk.
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: `demo-${Date.now()}@example.com`,
                    password: 'mock_password_hash',
                },
            });
        }

        // Extract short name from title, default to max 12 chars
        const shortName = data.title
            ? (data.title.split(' ')[0] || data.title).substring(0, 12)
            : 'App';

        const appProject = await prisma.appProject.create({
            data: {
                targetUrl: data.url,
                appName: data.title || 'My App',
                shortName: shortName,
                themeColor: data.themeColor || '#ffffff',
                iconUrls: "/icon-192.png",
                userId: user.id,
            },
        });

        return NextResponse.json({
            success: true,
            data: {
                id: appProject.id,
            },
        });
    } catch (error) {
        console.error('Generate API Error:', error);
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
