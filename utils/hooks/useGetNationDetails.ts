import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { ThePeopleAbi } from "../abis/ThePeopleAbi";
import { ThePeopleAddress } from "../constants/deployments";

const useGetNationDetails = (countryCode: string) => {
  const [result, setResult] = useState<{
    data: null | {
      nation: string;
      symbol: string;
      citizenship: string;
      stateDepartment: string;
      federalVoterRegistration: string;
      founder: string;
      awards: string;
      federalTimelock: string;
      federalGovernor: string;
    };
    status: string;
    error: string | null;
  }>({
    data: null,
    status: "loading",
    error: null,
  });

  const { data, isError, error } = useReadContract({
    abi: ThePeopleAbi,
    address: ThePeopleAddress,
    functionName: "nations",
    args: [countryCode],
  });

  useEffect(() => {
    if (data) {
      // Destructure the array into variables
      const [nation, symbol, citizenship, stateDepartment, federalVoterRegistration, founder, awards, federalTimelock, federalGovernor] = data;

      // Check if the nation does not exist by checking one of the expected non-empty values
      const isEmpty = [citizenship, stateDepartment, federalVoterRegistration, founder, awards, federalTimelock, federalGovernor].every(
        (address) => address === "0x0000000000000000000000000000000000000000" || address === ""
      );

      if (isEmpty) {
        setResult({
          data: null,
          status: "success",
          error: "nation does not exist",
        });
      } else {
        setResult({
          data: {
            nation,
            symbol,
            citizenship,
            stateDepartment,
            federalVoterRegistration,
            founder,
            awards,
            federalTimelock,
            federalGovernor,
          },
          status: "success",
          error: null,
        });
      }
    } else if (isError) {
      setResult({
        data: null,
        status: "error",
        error: error?.message || "Error fetching nation details",
      });
    } else {
      setResult(prev => ({ ...prev, status: "loading" }));
    }
  }, [data, isError, error]);

  return result;
};

export default useGetNationDetails;
