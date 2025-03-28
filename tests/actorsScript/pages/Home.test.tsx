import { render, screen, waitFor, act } from "@testing-library/react";
import { Home } from "../../../src/actorsScript/pages/Home";

describe("Home", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ version: "2.2.1" }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Render the app title", async () => {
    const title = "Actors Script";
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText(title)).toBeTruthy();
  });

  it("Render the link to instagram", async () => {
    await act(async () => {
      render(<Home />);
    });
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toMatch(/instagram/);
  });

  it("should render front and back versions", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      const footer = screen.getByRole("contentinfo");
      expect(footer.textContent).toMatch(
        /Frontend: \d{1,3}\.\d{1,3}\.\d{1,3} Backend: \d{1,3}\.\d{1,3}\.\d{1,3}/
      );
    });
  });
});
