import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        try {
            new URL(url);
        } catch {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        // AbortController for timeout (10 seconds)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'InstantApp-Analyzer/1.0',
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract Metadata
        const rawTitle = $('title').text() || $('meta[property="og:title"]').attr('content') || '';
        const rawDescription = $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';
        const themeColor = $('meta[name="theme-color"]').attr('content') || '#ffffff';

        // Attempt to find icons
        const icons: string[] = [];
        $('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="shortcut icon"]').each((_, el) => {
            const href = $(el).attr('href');
            if (href) {
                // Resolve relative URLs
                try {
                    const resolvedUrl = new URL(href, url).href;
                    icons.push(resolvedUrl);
                } catch (e) {
                    // Ignore invalid URLs
                }
            }
        });

        const finalTitle = rawTitle.trim() || new URL(url).hostname;
        const finalDescription = rawDescription.trim() || `App generated for ${finalTitle}`;

        return NextResponse.json({
            success: true,
            data: {
                url,
                title: finalTitle,
                description: finalDescription,
                themeColor,
                icons: [...new Set(icons)], // Remove duplicates
            },
        });

    } catch (error) {
        console.error('API Error:', error);
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json({ error: 'Request timeout' }, { status: 504 });
        }
        const message = error instanceof Error ? error.message : 'Failed to analyze URL';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
