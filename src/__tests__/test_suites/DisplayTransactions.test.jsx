import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";

describe("Display Transactions", () => {
  beforeEach(() => {
    global.setFetchResponse([
      {
        id: 1,
        date: "2019-12-01",
        description: "Paycheck",
        category: "Income",
        amount: 2000,
      },
      {
        id: 2,
        date: "2019-12-02",
        description: "Starbucks",
        category: "Food",
        amount: 5,
      },
    ]);
  });

  test("displays transactions on startup", async () => {
    render(<App />);

    expect(await screen.findByText(/paycheck/i)).toBeInTheDocument();
    expect(await screen.findByText(/starbucks/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions"
      );
    });
  });
});