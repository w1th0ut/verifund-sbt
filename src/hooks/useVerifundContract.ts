import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_CONFIG } from '@/lib/contract';
import { toast } from 'react-hot-toast';

export function useVerifundContract() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash 
    });

  // Read Functions
  const useIsWhitelisted = (address?: string) => {
    return useReadContract({
      ...CONTRACT_CONFIG,
      functionName: 'isWhitelisted',
      args: address ? [address as `0x${string}`] : undefined,
      query: {
        enabled: !!address
      }
    });
  };

  const useIsVerified = (address?: string) => {
    return useReadContract({
      ...CONTRACT_CONFIG,
      functionName: 'isVerified',
      args: address ? [address as `0x${string}`] : undefined,
      query: {
        enabled: !!address
      }
    });
  };

  const useGetBadgeInfo = (address?: string) => {
    return useReadContract({
      ...CONTRACT_CONFIG,
      functionName: 'getBadgeInfo',
      args: address ? [address as `0x${string}`] : undefined,
      query: {
        enabled: !!address
      }
    });
  };

  const useOwner = () => {
    return useReadContract({
      ...CONTRACT_CONFIG,
      functionName: 'owner'
    });
  };

  // Write Functions
  const givePermission = async (userAddress: string) => {
    try {
      await writeContract({
        ...CONTRACT_CONFIG,
        functionName: 'beriIzinMint',
        args: [userAddress as `0x${string}`]
      });
      toast.success('Permission berhasil diberikan!');
    } catch (err) {
      toast.error('Gagal memberikan permission');
      console.error(err);
    }
  };

  const claimBadge = async () => {
    try {
      await writeContract({
        ...CONTRACT_CONFIG,
        functionName: 'klaimLencanaSaya'
      });
      toast.success('Badge berhasil di-claim!');
    } catch (err) {
      toast.error('Gagal claim badge');
      console.error(err);
    }
  };

  return {
    // Read hooks
    useIsWhitelisted,
    useIsVerified,
    useGetBadgeInfo,
    useOwner,
    
    // Write functions
    givePermission,
    claimBadge,
    
    // Transaction states
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash
  };
}