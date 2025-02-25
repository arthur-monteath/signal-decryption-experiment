// app/room/[roomId]/page.tsx
'use client';

import Grid from '@/components/grid';
import Rulebook from '@/components/rulebook';
import { useParams, useSearchParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams(); 
  const searchParams = useSearchParams();
  const role = searchParams.get('role') ?? 'StudentA';
  const isPlayerA = role === 'StudentA';
  const scenario: 'A' | 'B' = 'A';

  return (
    <div className="min-h-screen p-4 flex flex-col gap-8 justify-center items-center">
        <Grid scenario={scenario} role={role as 'StudentA' | 'StudentB'} row={params.roomId as string} />
        <Rulebook isPlayerA={isPlayerA} scenario={scenario} />
    </div>
  );
}