import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

describe("Add Transactions", () => {
  beforeEach(() => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              date: "2019-12-01",
              description: "Paycheck",
              category: "Income",
              amount: 2000,
            },
          ]),
        ok: true,
        status: 200,
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            id: 2,
            date: "2026-04-17",
            description: "Groceries",
            category: "Food",
            amount: 45,
          }),
        ok: true,
        status: 200,
      });
  });

  test("adds new transactions to the frontend", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/paycheck/i);

    await user.type(screen.getByLabelText(/description/i), "Groceries");
    await user.type(screen.getByLabelText(/category/i), "Food");
    await user.type(screen.getByLabelText(/amount/i), "45");
    await user.type(screen.getByLabelText(/date/i), "2026-04-17");

    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    expect(await screen.findByText(/groceries/i)).toBeInTheDocument();
  });

  test("calls POST request when form is submitted", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/paycheck/i);

    await user.type(screen.getByLabelText(/description/i), "Groceries");
    await user.type(screen.getByLabelText(/category/i), "Food");
    await user.type(screen.getByLabelText(/amount/i), "45");
    await user.type(screen.getByLabelText(/date/i), "2026-04-17");

    await user.click(screen.getByRole("button", { name: /add transaction/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });
});