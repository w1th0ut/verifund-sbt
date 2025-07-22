'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { Badge, Gift, CheckCircle, Clock, XCircle } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVerifundContract } from '@/hooks/useVerifundContract';

export const UserPanel: React.FC = () => {
  const { address } = useAccount();
  
  const {
    claimBadge,
    isPending,
    useGetBadgeInfo
  } = useVerifundContract();

  const { data: badgeInfo, refetch } = useGetBadgeInfo(address);

  if (!address) {
    return (
      <Card title="User Panel" className="text-center">
        <p className="text-white/70">Silakan connect wallet terlebih dahulu</p>
      </Card>
    );
  }

  const handleClaimBadge = async () => {
    await claimBadge();
    // Refetch badge info setelah claim
    setTimeout(() => refetch(), 3000);
  };

  const getStatusInfo = () => {
    if (!badgeInfo) return null;

    const [hasPermission, isVerified, tokenId, metadataURI] = badgeInfo;

    if (isVerified) {
      return {
        status: 'verified',
        icon: CheckCircle,
        color: 'text-green-400',
        title: 'Badge Terverifikasi',
        description: 'Anda sudah memiliki badge verifikasi Verifund!',
        action: null
      };
    }

    if (hasPermission) {
      return {
        status: 'claimable',
        icon: Gift,
        color: 'text-yellow-400',
        title: 'Siap untuk Diklaim',
        description: 'Badge verifikasi Anda siap untuk diklaim!',
        action: (
          <Button 
            onClick={handleClaimBadge}
            loading={isPending}
            size="lg"
            className="w-full"
          >
            <Gift className="w-5 h-5" />
            Klaim Badge Verifikasi
          </Button>
        )
      };
    }

    return {
      status: 'pending',
      icon: Clock,
      color: 'text-orange-400',
      title: 'Menunggu Verifikasi',
      description: 'Anda belum mendapat izin untuk mengklaim badge. Silakan hubungi admin.',
      action: null
    };
  };

  const statusInfo = getStatusInfo();

  if (!statusInfo) {
    return (
      <Card title="User Panel" className="text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
        </div>
      </Card>
    );
  }

  const StatusIcon = statusInfo.icon;

  return (
    <Card title="User Panel" className="text-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <StatusIcon className={`w-16 h-16 ${statusInfo.color}`} />
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{statusInfo.title}</h3>
          <p className="text-white/70">{statusInfo.description}</p>
        </div>
      </div>

      {/* Address Info */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Address:</span>
            <span className="text-white font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          
          {badgeInfo && (
            <>
              <div className="flex justify-between">
                <span className="text-white/70">Whitelist Status:</span>
                <span className={`font-semibold ${badgeInfo[0] ? 'text-green-400' : 'text-red-400'}`}>
                  {badgeInfo[0] ? 'Diizinkan' : 'Tidak Diizinkan'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Badge Status:</span>
                <span className={`font-semibold ${badgeInfo[1] ? 'text-green-400' : 'text-red-400'}`}>
                  {badgeInfo[1] ? 'Sudah Diklaim' : 'Belum Diklaim'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Button */}
      {statusInfo.action && (
        <div className="pt-4">
          {statusInfo.action}
        </div>
      )}

      {/* Badge Preview untuk verified user */}
      {badgeInfo?.[1] && badgeInfo[3] && (
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Badge Metadata</h4>
          <a 
            href={badgeInfo[3].replace('ipfs://', 'https://ipfs.io/ipfs/')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline text-sm"
          >
            Lihat Metadata Badge
          </a>
        </div>
      )}
    </Card>
  );
};