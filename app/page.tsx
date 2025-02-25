// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthResponse {
  roleOptions: string[];
  studentAEmail: string;
  studentBEmail: string;
  timeA: string;
  timeB: string;
  movesA: string;
  movesB: string;
  error?: string;
}

export default function Home() {
  const [rowNumber, setRowNumber] = useState<string>('');
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row: rowNumber }),
    });
    const data: AuthResponse = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      setAuthData(data);
    }
  };

  const handleRoleSelect = (role: string) => {
    // Navigate to the room page, using the row number as the room identifier and the selected role as a query parameter.
    router.push(`/room/${rowNumber}?role=${role}`);
  };

  // If authentication data is available, show the role selection UI.
  if (authData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Select Your Role</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRoleSelect('StudentA')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            StudentA: {authData.studentAEmail}
          </button>
          <button
            onClick={() => handleRoleSelect('StudentB')}
            className="bg-blue-500 text-white p-2 rounded"
          >
            StudentB: {authData.studentBEmail}
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, show the login form for entering the row number.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Enter Row Number</h1>
      <form onSubmit={handleLoginSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={rowNumber}
          onChange={(e) => setRowNumber(e.target.value)}
          className="border p-2 mb-4 text-black"
          placeholder="Row Number"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
