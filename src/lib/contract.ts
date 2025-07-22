export const CONTRACT_CONFIG = {
  address: (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x...') as `0x${string}`,
  abi: [
    {
      "inputs": [{"name": "_user", "type": "address"}],
      "name": "beriIzinMint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "klaimLencanaSaya",
      "outputs": [],
      "stateMutability": "nonpayable", 
      "type": "function"
    },
    {
      "inputs": [{"name": "", "type": "address"}],
      "name": "isWhitelisted",
      "outputs": [{"name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"name": "_user", "type": "address"}],
      "name": "isVerified", 
      "outputs": [{"name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"name": "_user", "type": "address"}],
      "name": "getBadgeInfo",
      "outputs": [
        {"name": "hasWhitelistPermission", "type": "bool"},
        {"name": "isCurrentlyVerified", "type": "bool"},
        {"name": "tokenId", "type": "uint256"},
        {"name": "metadataURI", "type": "string"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [{"name": "", "type": "address"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "name": "pengguna", "type": "address"},
        {"indexed": true, "name": "tokenId", "type": "uint256"}
      ],
      "name": "LencanaDiklaim",
      "type": "event"
    }
  ] as const,
  chainId: 4202
} as const;