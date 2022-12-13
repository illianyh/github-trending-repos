import React from "react";
import { vi, expect, describe, it } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { MantineProvider } from "@mantine/core";
import { RepositoriesProvider } from "../../../context";
import RepoList from "..";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <RepositoriesProvider>{children}</RepositoriesProvider>
    </MantineProvider>
  </QueryClientProvider>
);

describe("RepoList", () => {
  it("mounts properly", () => {
    const wrapper = render(
      <ProviderWrapper>
        <RepoList />
      </ProviderWrapper>,
    );
    expect(wrapper).toBeTruthy();

    const title = wrapper.container.querySelector("h1");
    expect(title?.textContent).toBe("Trending repos");
  });

  it("should render the filters", async () => {
    render(
      <ProviderWrapper>
        <RepoList />
      </ProviderWrapper>,
    );
    expect(
      screen.getByRole("checkbox", {
        name: /all repos/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /last created in 7 days/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /filter by language/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /sort by desc/i,
      }),
    ).toBeInTheDocument();
  });

  it("should render the loader when fetching data", async () => {
    render(
      <ProviderWrapper>
        <RepoList />
      </ProviderWrapper>,
    );

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();

    await waitForElementToBeRemoved(loader);
    expect(loader).not.toBeInTheDocument();
  });
});

vi.resetAllMocks();
