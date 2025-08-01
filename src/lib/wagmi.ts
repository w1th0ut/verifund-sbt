import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { lisk } from 'wagmi/chains';

// Custom Lisk Sepolia chain configuration
const liskChain = {
  ...lisk,
  rpcUrls: {
    default: {
      http: ['https://lisk.drpc.org'],
    },
    public: {
      http: ['https://lisk.drpc.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Lisk Explorer',
      url: 'https://blockscout.lisk.com',
    },
  },
};

export const config = getDefaultConfig({
  appName: 'Verifund SBT Manager',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'default-project-id',
  chains: [liskChain],
  ssr: true,
});