import { rpc } from 'viem/utils'
import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

const besuChain = {
  id: 1337,
  name: 'Besu Private',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
        http: ['http://localhost:8545'],
    },
  },
}

export const config = createConfig({
  chains: [besuChain],
  transports: {
    [besuChain.id]: http(),
  },
})
