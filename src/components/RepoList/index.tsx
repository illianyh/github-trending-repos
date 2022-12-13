import {
  Container,
  Grid,
  Title,
  Text,
  Loader,
  Center,
  Pagination,
} from "@mantine/core";
import Filters from "../Filters";
import { MAX_RESULTS_PER_PAGE, useRepositoriesContext } from "../../context";
import RepoCard from "../RepoCard";

function RepoList() {
  const {
    addFavorite,
    currentPage,
    setCurrentPage,
    isFavourited,
    isLoading,
    removeFavorite,
    repositories,
    showFavourites,
  } = useRepositoriesContext();

  const totalPages = MAX_RESULTS_PER_PAGE / 10;

  return (
    <Container size={"xl"} pb={40}>
      <Title mt={24}>Trending repos</Title>
      <Filters />
      <Grid style={{ height: "100%" }} pt={24} pb={24}>
        {repositories?.length === 0 && (
          <Text pl={16}>
            <Center>No favourite repositories found!</Center>
          </Text>
        )}
        {isLoading ? (
          <Center style={{ width: "100%", height: "100%" }}>
            <Loader color="dark" data-testid="loader" />
          </Center>
        ) : (
          <>
            {repositories?.map((repo) => (
              <Grid.Col key={repo.id} md={6} lg={4}>
                <RepoCard
                  description={repo.description}
                  href={repo.html_url}
                  name={repo.name}
                  ratings={repo.stargazers_count}
                  isFavourite={isFavourited(repo.id)}
                  onClickFavourite={
                    isFavourited(repo.id)
                      ? () => removeFavorite(repo.id)
                      : () => addFavorite(repo)
                  }
                />
              </Grid.Col>
            ))}
          </>
        )}
      </Grid>
      {!showFavourites && (
        <Pagination
          color={"dark"}
          total={totalPages}
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </Container>
  );
}

export default RepoList;
