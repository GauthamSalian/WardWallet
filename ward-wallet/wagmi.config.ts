import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

import { MyContractABI } from './src/abis/myContract'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'MyContract',
      abi: MyContractABI,
    }
  ],
  plugins: [react()],
})
