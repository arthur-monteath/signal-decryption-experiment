// app/room/[roomId]/page.tsx
'use client';

import Grid from '@/components/grid';
import Rulebook from '@/components/rulebook';
import { useParams, useSearchParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') ?? 'StudentA';
  // Read the scenario from query parameters; default to 'A' if not provided.
  const scenario = (searchParams.get('scenario') as 'A' | 'B' | 'C') ?? 'A';
  const isPlayerA = role === 'StudentA';

  return (
    <div className="min-h-screen p-4 flex flex-row justify-center items-center">
      <Grid
        scenario={scenario}
        role={role as 'StudentA' | 'StudentB'}
        row={params.roomId as string}
      />
      <Rulebook isPlayerA={isPlayerA} scenario={scenario} />
    </div>
  );
}
