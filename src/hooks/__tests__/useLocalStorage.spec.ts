import { act, renderHook } from "@testing-library/react-hooks/dom";
import { vi, expect, describe, it } from "vitest";

import { useLocalStorage } from "../useLocalStorage";

class LocalStorageMock {
  store: Record<string, unknown> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value + "";
  }
}

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
});

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("has initial value and persisted in local storage", () => {
    vi.spyOn(window.localStorage, "setItem");
    window.localStorage.setItem("some_key", "hello");

    const { result } = renderHook(() => useLocalStorage("some_key", "hello"));

    expect(result.current[0]).toBe("hello");

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "some_key",
      "hello",
    );
  });

  it("updates the state", () => {
    const { result } = renderHook(() => useLocalStorage("some_key", "hello"));

    act(() => {
      const setState = result.current[1];
      setState("world");
    });

    expect(result.current[0]).toBe("world");
    expect(window.localStorage.getItem("some_key")).toBe(
      JSON.stringify("world"),
    );
  });
});
