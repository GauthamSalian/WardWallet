import { createPublicClient, http } from 'viem';

export const publicClient = createPublicClient({
  chain: {
    id: 1337,
    name: 'Besu Private',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      default: { http: ['http://localhost:8545'] },
    },
  },
  transport: http(),
});
