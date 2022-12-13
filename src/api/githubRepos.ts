import { useQuery } from "@tanstack/react-query";
import { RepositoriesResponse, SearchParams } from "../types";

const getRepositories = async (
  params: SearchParams,
): Promise<RepositoriesResponse> => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:>${params.createdAt}+language:${params.language}&sort=stars&order=${params.itemsOrder}&per_page=${params.perPage}&page=${params.currentPage}`,
  );
  if (!response.ok) {
    throw new Error("Data could not be fetched!");
  } else {
    return response.json();
  }
};

export const useGetRepositories = (query: SearchParams) => {
  return useQuery(
    ["repositories", query],
    () => getRepositories(query).then((response) => response.items),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

};
  