'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Shield, UserPlus, AlertCircle } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerifundContract } from '@/hooks/useVerifundContract';

export const AdminPanel: React.FC = () => {
  const { address } = useAccount();
  const [inputAddress, setInputAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState('');
  
  const {
    givePermission,
    isPending,
    useOwner,
    useIsWhitelisted,
    useIsVerified
  } = useVerifundContract();

  const { data: owner } = useOwner();
  const { data: isWhitelisted } = useIsWhitelisted(checkAddress);
  const { data: isVerified } = useIsVerified(checkAddress);

  const isAdmin = address && owner && address.toLowerCase() === owner.toLowerCase();

  const handleGivePermission = async () => {
    if (!inputAddress) {
      alert('Masukkan address terlebih dahulu');
      return;
    }

    if (!inputAddress.startsWith('0x') || inputAddress.length !== 42) {
      alert('Format address tidak valid');
      return;
    }

    await givePermission(inputAddress);
    setInputAddress('');
  };

  if (!address) {
    return (
      <Card title="Admin Panel" className="text-center">
        <p className="text-white/70">Silakan connect wallet terlebih dahulu</p>
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card title="Admin Panel" className="text-center">
        <AlertCircle className="mx-auto text-red-400 w-12 h-12 mb-4" />
        <p className="text-white/70">Anda bukan admin contract ini</p>
        <p className="text-sm text-white/50 mt-2">Owner: {owner}</p>
      </Card>
    );
  }

  return (
    <Card title="Admin Panel" className="space-y-6">
      <div className="flex items-center gap-2 text-green-400">
        <Shield className="w-5 h-5" />
        <span className="font-semibold">Admin Access Granted</span>
      </div>

      {/* Give Permission Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Berikan Izin Whitelist
        </h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="0x... (Address pengguna)"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
          />
          
          <Button
            onClick={handleGivePermission}
            loading={isPending}
            disabled={!inputAddress}
            className="w-full"
          >
            Berikan Izin Mint
          </Button>
        </div>
      </div>

      {/* Check Status Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Cek Status Address</h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="0x... (Address untuk dicek)"
            value={checkAddress}
            onChange={(e) => setCheckAddress(e.target.value)}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-indigo-400"
          />
          
          {checkAddress && (
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70">Whitelist Status:</span>
                <span className={`font-semibold ${isWhitelisted ? 'text-green-400' : 'text-red-400'}`}>
                  {isWhitelisted ? 'Di Whitelist' : 'Tidak Di Whitelist'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Verification Status:</span>
                <span className={`font-semibold ${isVerified ? 'text-green-400' : 'text-red-400'}`}>
                  {isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};