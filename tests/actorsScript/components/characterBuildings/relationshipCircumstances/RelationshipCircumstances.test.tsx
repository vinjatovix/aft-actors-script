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
  const mockSetFormData = jest.fn();

  const mockCharacters = [
    { id: "1", name: "Character 1" },
    { id: "2", name: "Character 2" },
  ];

  const mockRelations = [
    { character: { id: "1", name: "Character 1" }, circumstance: "Friend" },
  ];

  const renderComponent = (relations = mockRelations) =>
    render(
      <RelationshipCircumstances
        translationMap={mockTranslationMap}
        setRelations={mockSetRelations}
        relations={relations}
        characters={mockCharacters}
        setFormData={mockSetFormData}
        handleRelationChange={mockHandleRelationChange}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the RelationshipCircumstancesHeader component", () => {
    renderComponent();

    expect(
      screen.getByText(mockTranslationMap.relationshipCircumstances)
    ).toBeInTheDocument();
  });

  it("renders the Relation components for each relation", () => {
    renderComponent();

    expect(screen.getByText("Character 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Friend")).toBeInTheDocument();
  });

  it("calls setRelations when handleAddRelation is triggered", () => {
    renderComponent();

    const addButton = screen.getByTestId("add-relation");
    fireEvent.click(addButton);

    expect(mockSetRelations).toHaveBeenCalledWith([
      ...mockRelations,
      { character: { id: "", name: "" }, circumstance: "" },
    ]);
  });

  it("calls setRelations when handleRemoveRelation is triggered", () => {
    renderComponent();

    const removeButton = screen.getByTestId("remove-relation-0");
    fireEvent.click(removeButton);

    expect(mockSetRelations).toHaveBeenCalledWith([]);
  });
});
