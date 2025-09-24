// app/api/users/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function GET() {
  const users = [
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Jerry' },
  ];
  return NextResponse.json(users);
}
