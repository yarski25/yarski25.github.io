import { useState } from "react";

export const useFetching = (callback: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetching = async (...args: []) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
