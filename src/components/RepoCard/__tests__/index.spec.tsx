import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, describe, it } from "vitest";
import RepoCard, { Props } from "..";

describe("RepoCard", () => {
  let defaultProps: Props;

  beforeEach(() => {
    defaultProps = {
      description: "some description",
      href: "https://github.com/repo-123",
      name: "repo name 123",
      ratings: 1000,
      isFavourite: false,
      onClickFavourite: vi.fn(),
    };
  });

  it("should call onClickFavourite when star icon is clicked", () => {
    render(<RepoCard {...defaultProps} />);
    const favouriteBtn = screen.getByTestId("favouriteBtn-outline");

    fireEvent.click(favouriteBtn);

    expect(defaultProps.onClickFavourite).toHaveBeenCalledTimes(1);
  });

  it("should show filled variant when favourited", () => {
    render(<RepoCard {...defaultProps} isFavourite />);

    expect(screen.getByTestId("favouriteBtn-filled")).toBeInTheDocument();
  });
});
