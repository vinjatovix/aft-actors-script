import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildingCenterSelector } from "../../../../src/actorsScript/components/characterBuildings/CharacterBuildingCenterSelector";
import { characterBuildingTranslationMap } from "../../../../src/i18n/translationMap";

const currentLanguage = "es_gl";
const translationMap = characterBuildingTranslationMap[currentLanguage].center;

describe("CharacterBuildingCenterSelector", () => {
  const mockSetFormData = jest.fn();

  const renderComponent = (formData: { center: string }) => {
    render(
      <CharacterBuildingCenterSelector
        formData={formData}
        setFormData={mockSetFormData}
        translationMap={translationMap}
      />
    );
  };

  it("renders the select input with correct label", () => {
    renderComponent({ center: "" });
    expect(screen.getByLabelText(translationMap.label)).toBeInTheDocument();
  });

  it("renders all menu items", () => {
    renderComponent({ center: "" });
    fireEvent.mouseDown(screen.getByLabelText(translationMap.label));
    expect(
      screen.getByRole("option", { name: translationMap.instinctive })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: translationMap.mental })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: translationMap.emotional })
    ).toBeInTheDocument();
  });

  it("calls setFormData with the correct value when an option is selected", () => {
    renderComponent({ center: "" });
    fireEvent.mouseDown(screen.getByLabelText(translationMap.label));
    fireEvent.click(
      screen.getByRole("option", { name: translationMap.mental })
    );
    expect(mockSetFormData).toHaveBeenCalledWith({ center: "mental" });
  });

  it("sets the correct value in the select input", () => {
    renderComponent({ center: "emotional" });
    expect(screen.getByText(translationMap.emotional)).toBeInTheDocument();
  });
});
