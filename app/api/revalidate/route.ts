import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const slug = body?.slug?.current as string | undefined;

    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath('/life-members');

    if (slug) {
      revalidatePath(`/events/${slug}`);
    }

    return NextResponse.json({ revalidated: true, slug: slug ?? 'all' });
  } catch {
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}
