import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CreateCharacterBuildingModal } from "../../../../src/actorsScript/components/characterBuildings/CreateCharacterBuildingModal";
import { useDispatch, useSelector } from "react-redux";
import { commonTranslationMap } from "../../../../src/i18n/commonTranslationMap";
import { authors, books, characters, scenes } from "../../../data";
import { getBooksByAuthorId } from "../../../../src/redux/thunks/bookThunks";
import { getCharactersByBookId } from "../../../../src/redux/thunks/characterThunks";
import { getScenesByCharacterId } from "../../../../src/redux/thunks/sceneThunks";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../../../src/redux/thunks/bookThunks", () => ({
  getBooksByAuthorId: jest.fn((authorId) => () => Promise.resolve(authorId)),
}));

jest.mock("../../../../src/redux/thunks/characterThunks", () => ({
  getCharactersByBookId: jest.fn((bookId) => () => Promise.resolve(bookId)),
}));

jest.mock("../../../../src/redux/thunks/sceneThunks", () => ({
  getScenesByCharacterId: jest.fn(
    (characterId) => () => Promise.resolve(characterId)
  ),
}));

const LOCALE = "es_gl";
const TRANSLATION_MAP = commonTranslationMap[LOCALE];

let mockDispatch = jest.fn();

describe("CreateCharacterBuildingModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      authors,
      books,
      characters,
      scenes,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal when open is true", () => {
    const handleModalClose = jest.fn();
    const { getByText } = render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    const closeButton = getByText(new RegExp(TRANSLATION_MAP.close));

    expect(closeButton).toBeInTheDocument();
  });

  it("does not render the modal when open is false", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal
        open={false}
        handleModalClose={handleModalClose}
      />
    );
    const closeButton = screen.queryByText(new RegExp(TRANSLATION_MAP.close));

    expect(closeButton).toBeNull();
  });

  it("calls handleModalClose when the close button is clicked", () => {
    const handleModalClose = jest.fn();
    const { getByText } = render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    const closeButton = getByText(new RegExp(TRANSLATION_MAP.close));

    fireEvent.click(closeButton);

    expect(handleModalClose).toHaveBeenCalled();
  });

  it("renders authors in the author dropdown", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));

    for (const author of authors) {
      expect(screen.getByText(author.name)).toBeInTheDocument();
    }
  });

  it("dispatches getBooksByAuthorId when an author is selected", () => {
    const handleModalClose = jest.fn();

    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));

    expect(getBooksByAuthorId).toHaveBeenCalledWith(authors[0].id);
  });

  it("renders books in the book dropdown when an author is selected", () => {
    const handleModalClose = jest.fn();

    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));

    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));

    for (const book of books) {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    }
  });

  it("dispatches getCharactersByBookId when a book is selected", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));
    fireEvent.click(screen.getByText(books[0].title));
    expect(getCharactersByBookId).toHaveBeenCalledWith(books[0].id);
  });

  it("renders characters in the character dropdown when a book is selected", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));
    fireEvent.click(screen.getByText(books[0].title));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.character));

    for (const character of characters) {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    }
  });

  it("dispatches getScenesByCharacterId when a character is selected", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));
    fireEvent.click(screen.getByText(books[0].title));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.character));
    fireEvent.click(screen.getByText(characters[0].name));
    expect(getScenesByCharacterId).toHaveBeenCalledWith(characters[0].id);
  });

  it("renders scenes in the scene dropdown when a character is selected", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));
    fireEvent.click(screen.getByText(books[0].title));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.character));
    fireEvent.click(screen.getByText(characters[0].name));
    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.scene));

    for (const scene of scenes) {
      expect(screen.getByText(scene.description)).toBeInTheDocument();
    }
  });

  it("clears selections and closes the modal when clearAndClose is called", () => {
    const handleModalClose = jest.fn();
    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );
    fireEvent.click(screen.getByText(TRANSLATION_MAP.close));
    expect(handleModalClose).toHaveBeenCalled();
  });

  it("renders the create button when all selections are made", () => {
    const handleModalClose = jest.fn();

    render(
      <CreateCharacterBuildingModal open handleModalClose={handleModalClose} />
    );

    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.author));
    fireEvent.click(screen.getByText(authors[0].name));

    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.book));
    fireEvent.click(screen.getByText(books[0].title));

    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.character));
    fireEvent.click(screen.getByText(characters[0].name));

    fireEvent.mouseDown(screen.getByLabelText(TRANSLATION_MAP.scene));
    fireEvent.click(screen.getByText(scenes[0].description));

    const createButtonText = `${TRANSLATION_MAP.create} ${TRANSLATION_MAP.character}`;
    expect(
      screen.getByText(new RegExp(createButtonText, "i"))
    ).toBeInTheDocument();
  });
});
