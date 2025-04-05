import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Relation } from "../../../../../src/actorsScript/components/characterBuildings/relationshipCircumstances/Relation";

describe("Relation Component", () => {
  const mockTranslationMap = {
    relationshipCircumstances: "Circunstancias de relación",
    character: "Personaxe",
    circumstance: "Circunstancia",
  };

  const mockCharacters = [
    { id: "1", name: "Character 1" },
    { id: "2", name: "Character 2" },
  ];

  const mockRelations = [
    { character: { id: "1", name: "Character 1" }, circumstance: "Friend" },
  ];

  const mockHandleRelationChange = jest.fn();
  const mockSetRelations = jest.fn();
  const mockHandleRemoveRelation = jest.fn();

  it("renders the component with existing relation", () => {
    const { getByText, getByDisplayValue } = render(
      <Relation
        translationMap={mockTranslationMap}
        relation={mockRelations[0]}
        index={0}
        handleRelationChange={mockHandleRelationChange}
        relations={mockRelations}
        setRelations={mockSetRelations}
        handleRemoveRelation={mockHandleRemoveRelation}
        characters={mockCharacters}
      />
    );

    expect(getByText("Character 1")).toBeInTheDocument();
    expect(getByDisplayValue("Friend")).toBeInTheDocument();
  });

  it("calls handleRemoveRelation when delete button is clicked", () => {
    const { getByRole } = render(
      <Relation
        translationMap={mockTranslationMap}
        relation={mockRelations[0]}
        index={0}
        handleRelationChange={mockHandleRelationChange}
        relations={mockRelations}
        setRelations={mockSetRelations}
        handleRemoveRelation={mockHandleRemoveRelation}
        characters={mockCharacters}
      />
    );

    fireEvent.click(getByRole("button"));
    expect(mockHandleRemoveRelation).toHaveBeenCalledWith(0);
  });

  it("updates relation when a new character is selected", () => {
    const { getByLabelText } = render(
      <Relation
        translationMap={mockTranslationMap}
        relation={{ character: { id: "", name: "" }, circumstance: "" }}
        index={0}
        handleRelationChange={mockHandleRelationChange}
        relations={[{ character: { id: "", name: "" }, circumstance: "" }]}
        setRelations={mockSetRelations}
        handleRemoveRelation={mockHandleRemoveRelation}
        characters={mockCharacters}
      />
    );

    fireEvent.mouseDown(getByLabelText(mockTranslationMap.character));
    fireEvent.click(screen.getByText("Character 2"));

    expect(mockSetRelations).toHaveBeenCalledWith([
      {
        character: { id: "2", name: "Character 2" },
        circumstance: "",
      },
    ]);
  });

  it("calls handleRelationChange when circumstance is updated", () => {
    const { getByLabelText } = render(
      <Relation
        translationMap={mockTranslationMap}
        relation={mockRelations[0]}
        index={0}
        handleRelationChange={mockHandleRelationChange}
        relations={mockRelations}
        setRelations={mockSetRelations}
        handleRemoveRelation={mockHandleRemoveRelation}
        characters={mockCharacters}
      />
    );

    fireEvent.change(getByLabelText(mockTranslationMap.circumstance), {
      target: { value: "Sibling" },
    });

    expect(mockHandleRelationChange).toHaveBeenCalledWith(
      0,
      "circumstance",
      "Sibling"
    );
  });
});
