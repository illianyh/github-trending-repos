export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
    url: string;
    login: string;
  };
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  language: string;
};

export type RepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
};

export type ItemsOrder =  "desc" | "asc";
export type SearchParams = {
  createdAt: string;
  currentPage: number;
  itemsOrder: ItemsOrder;
  language?: string;
  perPage: number;
};

export type RContextType = {
  addFavorite: (repo: Repository) => void;
  currentPage: number;
  filterByLanguage: string | undefined;
  handleReload: () => void;
  itemsOrder: ItemsOrder;
  isError: boolean;
  isFavourited: (id: Repository["id"]) => boolean;
  isLoading: boolean;
  priorDays: number;
  setCurrentPage: (page: number) => void;
  setItemsOrder: (order: ItemsOrder) => void;
  setPriorDays: (days: number) => void;
  removeFavorite: (id: Repository["id"]) => void;
  queryParams: SearchParams;
  repositories: Repository[] | undefined;
  resultsPerPage: number;
  setFilterByLanguage: (filter?: string) => void;
  setResultsPerPage: (page: number) => void;
  setShowFavourites: (isFavourite: boolean) => void;
  showFavourites: boolean;
};