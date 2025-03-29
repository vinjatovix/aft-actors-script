import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { ActorsScriptRoutes } from "../../../src/actorsScript/routes/ActorsScriptRoutes";

jest.mock("../../../src/actorsScript/pages/Home", () => ({
  Home: jest.fn(() => <div>Home Page</div>),
}));

jest.mock("../../../src/actorsScript/pages/Authors", () => ({
  Authors: jest.fn(() => <div>Authors Page</div>),
}));

jest.mock("../../../src/actorsScript/pages/Books", () => ({
  Books: jest.fn(() => <div>Books Page</div>),
}));

jest.mock("../../../src/actorsScript/pages/Characters", () => ({
  Characters: jest.fn(() => <div>Characters Page</div>),
}));

jest.mock("../../../src/actorsScript/pages/Scenes", () => ({
  Scenes: jest.fn(() => <div>Scenes Page</div>),
}));

jest.mock("../../../src/actorsScript/pages/CharacterBuildings", () => ({
  CharacterBuildings: jest.fn(() => <div>Character Buildings Page</div>),
}));

describe("ActorsScriptRoutes", () => {
  it("renders the Home page for the root path", () => {
    render(
      <MemoryRouter
        initialEntries={["/"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders the Authors page for the /authors path", () => {
    render(
      <MemoryRouter
        initialEntries={["/authors"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Authors Page")).toBeInTheDocument();
  });

  it("renders the Books page for the /plays path", () => {
    render(
      <MemoryRouter
        initialEntries={["/plays"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Books Page")).toBeInTheDocument();
  });

  it("renders the Characters page for the /characters path", () => {
    render(
      <MemoryRouter
        initialEntries={["/characters"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Characters Page")).toBeInTheDocument();
  });

  it("renders the Scenes page for the /scenes path", () => {
    render(
      <MemoryRouter
        initialEntries={["/scenes"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Scenes Page")).toBeInTheDocument();
  });

  it("renders the Character Buildings page for the /character-buildings path", () => {
    render(
      <MemoryRouter
        initialEntries={["/character-buildings"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Character Buildings Page")).toBeInTheDocument();
  });

  it("renders the Home page for an unknown path", () => {
    render(
      <MemoryRouter
        initialEntries={["/unknown"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ActorsScriptRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
