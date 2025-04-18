import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItemText,
} from "@mui/material";
import { CharacterBuilding } from "../../../../redux/interfaces/characterBuildingInterfaces";
import { ExpandMore } from "@mui/icons-material";
import { CharacterAccordion } from "./CharacterAccordion";

export const PlayAccordion = ({
  play,
  onCharacterBuildingSelect,
}: {
  play: {
    title: string;
    characters: {
      characterName: string;
      characterBuildings: CharacterBuilding[];
    }[];
  };
  onCharacterBuildingSelect: (building: CharacterBuilding) => () => void;
}) => (
  <Accordion sx={{ width: "100%", padding: 0 }}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <ListItemText primary={play.title} />
    </AccordionSummary>

    <AccordionDetails sx={{ padding: 0 }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {play.characters.map((character) => (
          <CharacterAccordion
            key={character.characterName}
            character={character}
            onCharacterBuildingSelect={onCharacterBuildingSelect}
          />
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);
