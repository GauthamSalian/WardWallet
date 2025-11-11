import { createPublicClient, http } from 'viem';

export const publicClient = createPublicClient({
  transport: http('http://localhost:8545'),
});
