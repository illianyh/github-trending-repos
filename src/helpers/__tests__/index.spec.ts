import { vi, expect, describe, it } from "vitest";
import { createdAtDate } from "..";

describe("createdAtDate", () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  });
  it.each`
    days  | expected
    ${7}  | ${"2019-12-25"}
    ${10} | ${"2019-12-22"}
    ${30} | ${"2019-12-02"}
    ${60} | ${"2019-11-02"}
  `("expected:$expected, when days:$days", ({ days, expected }) => {
    const minutes = createdAtDate(days);

    expect(minutes).toEqual(expected);
  });
});
