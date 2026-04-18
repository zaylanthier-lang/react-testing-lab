import { describe, test, expect } from "vitest";
import "./test_suites/DisplayTransactions.test";
import "./test_suites/AddTransactions.test";
import "./test_suites/SearchSort.test";

describe("Test suite loader", () => {
  test("loads all transaction test suites", () => {
    expect(true).toBe(true);
  });
});