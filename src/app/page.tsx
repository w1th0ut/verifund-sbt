'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AdminPanel } from '@/components/AdminPanel';
import { UserPanel } from '@/components/UserPanel';
import { CONTRACT_CONFIG } from '@/lib/contract';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Verifund SBT Manager
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Platform manajemen Soulbound Token untuk verifikasi pengguna Verifund. 
          Admin dapat memberikan izin whitelist, dan pengguna dapat mengklaim badge verifikasi mereka.
        </p>
        
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        <AdminPanel />
        <UserPanel />
      </div>

      {/* Footer */}
      <div className="text-center text-white/50 text-sm">
        <p>Verifund SBT pada Lisk</p>
        <p className="mt-2">
          Contract: <code className="bg-white/10 px-2 py-1 rounded font-mono">
            {CONTRACT_CONFIG.address}
          </code>
        </p>
      </div>
    </div>
  );
}