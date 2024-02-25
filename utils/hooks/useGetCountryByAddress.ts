import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { VerifierABI } from "../abis/VerifierAbi";
import { VerifierAddress } from "../constants/deployments";

const useGetCountry = (ethereumAddress: string) => {
  const [result, setResult] = useState<{
    data: any;
    status: string;
    error: string | null;
  }>({
    data: null,
    status: "loading",
    error: null,
  });

  const { data, isError, error } = useReadContract({
    abi: VerifierABI,
    address: VerifierAddress,
    functionName: "getCountry",
    args: [ethereumAddress],
  });


  useEffect(() => {
    if (data) {
      setResult({ data, status: "success", error: null });
    } else if (isError) {
      setResult({ data: null, status: "error", error: error?.message });
    } else if (data === undefined) {
      setResult({
        data: null,
        status: "success",
        error: "no country verified for this address",
      });
    } else {
      setResult((prev) => ({ ...prev, status: "loading" }));
    }
  }, [data, isError, error]);

  return result;
};

export default useGetCountry;
