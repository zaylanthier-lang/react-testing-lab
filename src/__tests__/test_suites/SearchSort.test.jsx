import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    global.setFetchResponse([
      {
        id: 1,
        date: "2019-12-01",
        description: "Zebra Cakes",
        category: "Food",
        amount: 10,
      },
      {
        id: 2,
        date: "2019-12-02",
        description: "Alpha Rent",
        category: "Housing",
        amount: 900,
      },
      {
        id: 3,
        date: "2019-12-03",
        description: "Coffee",
        category: "Food",
        amount: 4,
      },
    ]);
  });

  test("triggers a change event and updates the page", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/zebra cakes/i);

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, "coffee");

    expect(screen.getByText(/coffee/i)).toBeInTheDocument();
    expect(screen.queryByText(/zebra cakes/i)).not.toBeInTheDocument();
  });

  test("filters transactions with search functionality", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText(/alpha rent/i);

    const searchInput = screen.getByLabelText(/search/i);
    await user.type(searchInput, "alpha");

    expect(screen.getByText(/alpha rent/i)).toBeInTheDocument();
    expect(screen.queryByText(/coffee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/zebra cakes/i)).not.toBeInTheDocument();
  });
});