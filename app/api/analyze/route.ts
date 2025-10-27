import { NextResponse } from 'next/server';

// This API route is disabled because the application is configured for static export (`output: 'export'`).
// API routes are not supported in a static build. The analysis logic has been moved to the client side.
export async function POST(request: Request) {
    return NextResponse.json({ error: 'This API route is not available in a static export.' }, { status: 404 });
}
