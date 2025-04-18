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

  it("should render the header with the provided text", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SideBar header="Test Header" />
      </Provider>
    );
    
    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("should render the plays and characters correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    expect(getByText("Play 1")).toBeInTheDocument();
    expect(getByText("Character 1")).toBeInTheDocument();
    expect(getByText("Scene 1")).toBeInTheDocument();
  });

  it("should dispatch setSelectedCharacterBuilding when a scene is clicked", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );

    fireEvent.click(getByText("Scene 1"));

    expect(mockDispatch).toHaveBeenCalledWith(clearSelectedCharacterBuilding());
    expect(mockDispatch).toHaveBeenCalledWith(
      setSelectedCharacterBuilding({
        id: 1,
        character: { book: { title: "Play 1" }, name: "Character 1" },
        scene: { description: "Scene 1" },
      })
    );
  });
});
