import React, { createContext, useContext, useMemo, useState } from "react";
import { useGetRepositories } from "../api/githubRepos";
import { createdAtDate } from "../helpers";
import { ItemsOrder, RContextType, Repository, SearchParams } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const MAX_RESULTS_PER_PAGE = 100;

const LOCAL_STORAGE_KEY = "FAVORITE_REPOSITORIES";
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const defaultState = {
  addFavorite: noop,
  currentPage: 0,
  handleReload: noop,
  itemsOrder: "desc" as ItemsOrder,
  isError: false,
  isFavourited: () => false,
  isLoading: true,
  filterByLanguage: undefined,
  priorDays: 7,
  setCurrentPage: noop,
  setItemsOrder: noop,
  setPriorDays: noop,
  removeFavorite: noop,
  queryParams: {
    createdAt: createdAtDate(7),
    currentPage: 1,
    itemsOrder: "desc" as ItemsOrder,
    perPage: 10,
  },
  repositories: [],
  resultsPerPage: 10,
  setFilterByLanguage: noop,
  setResultsPerPage: noop,
  setShowFavourites: noop,
  showFavourites: false,
};

const RepositoriesContext = createContext<RContextType>(defaultState);

export const RepositoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterByLanguage, setFilterByLanguage] = useState<
    string | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOrder, setItemsOrder] = useState<ItemsOrder>("desc");
  const priorDaysOptions = [7, 30, 60, 90, 180, 365];
  const [priorDays, setPriorDays] = useState<number>(7);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [favourites, setFavourites] = useLocalStorage<Repository[]>(
    LOCAL_STORAGE_KEY,
    [],
  );
  const [showFavourites, setShowFavourites] = useState(false);

  const addFavorite = (repo: Repository) => {
    setFavourites((prevRepos) => [...prevRepos, repo]);
  };

  const removeFavorite = (id: Repository["id"]) => {
    setFavourites((prevRepos) => prevRepos.filter((repo) => repo.id !== id));
  };

  const queryParams: SearchParams = {
    createdAt: createdAtDate(priorDays),
    ...(filterByLanguage && {
      language: filterByLanguage,
    }),
    itemsOrder,
    currentPage,
    perPage: resultsPerPage,
  };

  const { data, isError, isLoading, isFetched } =
    useGetRepositories(queryParams);

  const repositories = showFavourites ? favourites : data;

  const isFavourited = (id: Repository["id"]) =>
    !!favourites.find((r) => r.id === id);

  const languages = [
    "Go",
    "JavaScript",
    "Kotlin",
    "Java",
    "Python",
    "TypeScript",
    "Ruby",
    "Swift",
  ];

  const handleReload = () => {
    setCurrentPage(1);
    setFilterByLanguage("All");
    setItemsOrder("desc");
    setPriorDays(7);
  }

  const contextValues = useMemo(
    () => ({
      addFavorite,
      isFavourited,
      currentPage,
      filterByLanguage,
      handleReload,
      itemsOrder,
      isError,
      isLoading,
      isFetched,
      languages,
      priorDays,
      priorDaysOptions,
      setCurrentPage,
      setItemsOrder,
      setPriorDays,
      removeFavorite,
      queryParams,
      repositories,
      resultsPerPage,
      setFilterByLanguage,
      setResultsPerPage,
      setShowFavourites,
      showFavourites,
    }),
    [
      repositories,
      addFavorite,
      handleReload,
      isFavourited,
      currentPage,
      filterByLanguage,
      itemsOrder,
      isError,
      isLoading,
      isFetched,
      languages,
      priorDays,
      priorDaysOptions,
      removeFavorite,
      queryParams,
      repositories,
      resultsPerPage,
      showFavourites,
    ],
  );

  return (
    <RepositoriesContext.Provider value={contextValues}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositoriesContext = () => {
  const context = useContext(RepositoriesContext);
  if (!context) {
    throw new Error(`Must be called within RepositoriesProvider!`);
  }
  return context;
};
