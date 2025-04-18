import { useMediaQuery } from "@mui/material";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SideBar } from "../../../../src/actorsScript/components/sidebar/SideBar";
import { useDispatch, useSelector, Provider } from "react-redux";
import {
  clearSelectedCharacterBuilding,
  setSelectedCharacterBuilding,
} from "../../../../src/redux/slices/characterBuildingSlice";
import { mockStore } from "../../../__mocks__/mockStore";

jest.mock("react-redux", () => {
  const actualReactRedux = jest.requireActual("react-redux");
  return {
    ...actualReactRedux,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

describe("SideBar Component", () => {
  let store: ReturnType<typeof mockStore>;
  let mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch = jest.fn();
    store = mockStore({
      characterBuilding: {
        characterBuildings: [
          {
            id: 1,
            character: { book: { title: "Play 1" }, name: "Character 1" },
            scene: { description: "Scene 1" },
          },
        ],
        loading: false,
        error: null,
        selectedCharacterBuilding: null,
      },
    });

    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback(store.getState())
    );
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("in desktop mode (permanent drawer)", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(false);
    });

    it("renders the header", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar header="Test Header" mobileOpen={false} />
        </Provider>
      );
      expect(getByText("Test Header")).toBeInTheDocument();
    });

    it("renders the character info correctly", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar mobileOpen={false} />
        </Provider>
      );

      expect(getByText("Play 1")).toBeInTheDocument();
      expect(getByText("Character 1")).toBeInTheDocument();
      expect(getByText("Scene 1")).toBeInTheDocument();
    });

    it("dispatches selection when scene is clicked", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar mobileOpen={false} />
        </Provider>
      );

      fireEvent.click(getByText("Scene 1"));

      expect(mockDispatch).toHaveBeenCalledWith(
        clearSelectedCharacterBuilding()
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        setSelectedCharacterBuilding({
          id: 1,
          character: { book: { title: "Play 1" }, name: "Character 1" },
          scene: { description: "Scene 1" },
        })
      );
    });
  });

  describe("in mobile mode (temporary drawer)", () => {
    beforeEach(() => {
      (useMediaQuery as jest.Mock).mockReturnValue(true);
    });

    it("renders the header", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar header="Test Header" mobileOpen />
        </Provider>
      );
      expect(getByText("Test Header")).toBeInTheDocument();
    });

    it("renders the character info correctly", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar mobileOpen />
        </Provider>
      );

      expect(getByText("Play 1")).toBeInTheDocument();
      expect(getByText("Character 1")).toBeInTheDocument();
      expect(getByText("Scene 1")).toBeInTheDocument();
    });

    it("dispatches selection when scene is clicked", () => {
      const { getByText } = render(
        <Provider store={store}>
          <SideBar mobileOpen />
        </Provider>
      );

      fireEvent.click(getByText("Scene 1"));

      expect(mockDispatch).toHaveBeenCalledWith(
        clearSelectedCharacterBuilding()
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        setSelectedCharacterBuilding({
          id: 1,
          character: { book: { title: "Play 1" }, name: "Character 1" },
          scene: { description: "Scene 1" },
        })
      );
    });
  });
});
