import { render, screen, fireEvent } from "@testing-library/react";
import { RepositoriesProvider, useRepositoriesContext } from "..";
import { MantineProvider, Switch } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TestComponent = () => {
  const { showFavourites, setShowFavourites } = useRepositoriesContext();

  return (
    <Switch
      onLabel={"Favourite repos"}
      offLabel={"All repos"}
      checked={showFavourites}
      onChange={(event) => setShowFavourites(event.currentTarget.checked)}
    />
  );
};

const renderTestComponent = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider>
        <RepositoriesProvider>
          <TestComponent />
        </RepositoriesProvider>
      </MantineProvider>
    </QueryClientProvider>,
  );

describe("RepositoriesProvider", () => {
  it("shows all repos default", () => {
    renderTestComponent();

    expect(
      screen.getByRole("checkbox", {
        name: /all repos/i,
      }),
    ).toBeInTheDocument();
  });

  it("changes to favourites repo when clicked", () => {
    renderTestComponent();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /all repos/i,
      }),
    );

    expect(
      screen.getByRole("checkbox", {
        name: /favourite repos/i,
      }),
    ).toBeInTheDocument();
  });
});
