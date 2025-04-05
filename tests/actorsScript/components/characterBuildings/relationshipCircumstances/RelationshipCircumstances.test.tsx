import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RelationshipCircumstances } from "../../../../../src/actorsScript/components/characterBuildings/relationshipCircumstances/RelationshipCircumstances";

describe("RelationshipCircumstances Component", () => {
  const mockTranslationMap = {
    relationshipCircumstances: "Relationship Circumstances",
    character: "Character",
    circumstance: "Circumstance",
  };

  const mockSetRelations = jest.fn();
  const mockHandleRelationChange = jest.fn();

  const mockCharacters = [
    { id: "1", name: "Character 1" },
    { id: "2", name: "Character 2" },
  ];

  const mockRelations = [
    { character: { id: "1", name: "Character 1" }, circumstance: "Friend" },
  ];

  it("renders the RelationshipCircumstancesHeader component", () => {
    render(
      <RelationshipCircumstances
        translationMap={mockTranslationMap}
        setRelations={mockSetRelations}
        relations={mockRelations}
        handleRelationChange={mockHandleRelationChange}
        characters={mockCharacters}
      />
    );

    expect(
      screen.getByText(mockTranslationMap.relationshipCircumstances)
    ).toBeInTheDocument();
  });

  it("renders the Relation components for each relation", () => {
    render(
      <RelationshipCircumstances
        translationMap={mockTranslationMap}
        setRelations={mockSetRelations}
        relations={mockRelations}
        handleRelationChange={mockHandleRelationChange}
        characters={mockCharacters}
      />
    );

    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Friend")).toBeInTheDocument();
  });

  it("calls setRelations when handleAddRelation is triggered", () => {
    render(
      <RelationshipCircumstances
        translationMap={mockTranslationMap}
        setRelations={mockSetRelations}
        relations={mockRelations}
        handleRelationChange={mockHandleRelationChange}
        characters={mockCharacters}
      />
    );

    const addButton = screen.getByTestId("add-relation");
    fireEvent.click(addButton);

    expect(mockSetRelations).toHaveBeenCalledWith([
      ...mockRelations,
      { character: { id: "", name: "" }, circumstance: "" },
    ]);
  });

  it("calls setRelations when handleRemoveRelation is triggered", () => {
    render(
      <RelationshipCircumstances
        translationMap={mockTranslationMap}
        setRelations={mockSetRelations}
        relations={mockRelations}
        handleRelationChange={mockHandleRelationChange}
        characters={mockCharacters}
      />
    );

    const removeButton = screen.getByTestId("remove-relation-0");
    fireEvent.click(removeButton);

    expect(mockSetRelations).toHaveBeenCalledWith([]);
  });
});
