import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildingHeader } from "../../../../src/actorsScript/components/characterBuildings/CharacterBuildingHeader";
import { characterBuildingTranslationMap } from "../../../../src/i18n/translationMap";

const currentLanguage = "es_gl";
const translationMap = characterBuildingTranslationMap[currentLanguage];
const CHARACTER_NAME = "Name";
const SCENE_DESCRIPTION = "Description";

describe("CharacterBuildingHeader", () => {
  it("renders the name and description correctly", () => {
    const { getByText } = render(
      <CharacterBuildingHeader
        name={CHARACTER_NAME}
        description={SCENE_DESCRIPTION}
        updatedAt={null}
      />
    );

    expect(
      getByText(`${CHARACTER_NAME} ${translationMap.at} ${SCENE_DESCRIPTION}`)
    ).toBeInTheDocument();
  });

  it("renders the updatedAt text when provided", () => {
    const mockUpdatedAt = new Date().toISOString();
    const regex = new RegExp(`${translationMap.updated}`, "i");

    const { getByText } = render(
      <CharacterBuildingHeader
        name={CHARACTER_NAME}
        description={SCENE_DESCRIPTION}
        updatedAt={mockUpdatedAt}
      />
    );

    expect(getByText(regex)).toBeInTheDocument();
  });
});
