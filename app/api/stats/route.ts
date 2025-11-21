import { NextResponse } from 'next/server';
import { getLinkStats } from '../../../lib/analytics';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const stats = await getLinkStats(id);
        if (!stats) {
            return NextResponse.json({ message: 'Link not found' }, { status: 404 });
        }
        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ message: 'Error retrieving statistics' }, { status: 500 });
    }
}