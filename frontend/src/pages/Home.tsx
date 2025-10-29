import React, { useEffect, useState } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import API from '../services/api';

export default function Home() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    API.get('/healthz')
    .then(() => setStatus('✅ Connected ✅'))
    .catch(() => setStatus('❌ Unreachable ❌'))
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logos */}
      <div className='flex justify-center'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Hero */}
      <div className='space-y-5'>
        <h1 className="font-semibold">Auxilium</h1>
        <h2 className="text-2xl">A HelpDesk and Ticketing System using</h2>
        <h3 className="text-xl">Vite + React on RAILS</h3>
        {/* API Connection test */}
        <div className="card space-y-2">
          <p>API Connection Status:</p>
          <h3 className='text-xl italic'>{status}</h3>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}
