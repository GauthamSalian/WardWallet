import { useReadContract } from "wagmi";
import { MyContractABI } from "@/abis/myContract";

export function GetProjectHistory() {
  const { data, isError, isLoading } = useReadContract({
    address: process.env.WARDWALLET_CONTRACT_KEY as `0x${string}`,
    abi: MyContractABI,
    functionName: "getProjectHistory",
    args: [
      "0x70726f706f73616c313233000000000000000000000000000000000000000000",
    ] as const,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <div>
      <h2>Project History</h2>
      <pre>
        {JSON.stringify(
          data,
          (key, value) =>
            typeof value === "bigint" ? value.toString() : value,
          2
        )}
      </pre>
    </div>
  );
}
