import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CharacterBuilding } from "../../../../redux/interfaces/characterBuildingInterfaces";
import { ExpandMore } from "@mui/icons-material";

export const CharacterAccordion = ({
  character,
  onCharacterBuildingSelect,
}: {
  character: {
    characterName: string;
    characterBuildings: CharacterBuilding[];
  };
  onCharacterBuildingSelect: (building: CharacterBuilding) => () => void;
}) => (
  <Accordion sx={{ width: "100%", mb: 1 }}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <ListItemText primary={character.characterName} />
    </AccordionSummary>
    <AccordionDetails>
      {character.characterBuildings.map((building) => (
        <ListItem key={building.id} disablePadding sx={{ mt: 1 }}>
          <ListItemButton onClick={onCharacterBuildingSelect(building)}>
            <ListItemText primary={building.scene.description} />
          </ListItemButton>
        </ListItem>
      ))}
    </AccordionDetails>
  </Accordion>
);
