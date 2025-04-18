import { Toolbar, Typography, Divider, List } from "@mui/material";
import { CharacterBuilding } from "../../../../redux/interfaces/characterBuildingInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/types";
import {
  clearSelectedCharacterBuilding,
  setSelectedCharacterBuilding,
} from "../../../../redux/slices/characterBuildingSlice";
import { getAllCharacterBuildings } from "../../../../redux/thunks/characterBuildingThunks";
import { useEffect } from "react";
import { PlayAccordion } from "./PlayAccordion";

export const CharacterBuildingsDrawer = ({
  header = "Construccións",
  icon,
}: {
  header?: string;
  icon?: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { characterBuildings } = useSelector(
    (state: RootState) => state.characterBuilding
  );

  useEffect(() => {
    dispatch(getAllCharacterBuildings());
  }, [dispatch]);

  const handleCharacterBuildingSelect = (building: CharacterBuilding) => () => {
    dispatch(clearSelectedCharacterBuilding());
    dispatch(setSelectedCharacterBuilding(building));
  };

  const constructionsByPlay = characterBuildings?.reduce(
    (acc, characterBuilding) => {
      const title = characterBuilding?.character?.book?.title;
      if (!title) return acc;
      const characterName = characterBuilding?.character?.name;
      if (!acc[title]) {
        acc[title] = { [characterName]: [characterBuilding] };
      } else if (!acc[title][characterName]) {
        acc[title][characterName] = [characterBuilding];
      } else {
        acc[title][characterName].push(characterBuilding);
      }
      return acc;
    },
    {} as Record<string, Record<string, CharacterBuilding[]>>
  );

  const plays = Object.entries(constructionsByPlay ?? {}).map(
    ([playName, characters]) => ({
      title: playName,
      characters: Object.entries(characters).map(
        ([characterName, characterBuildings]) => ({
          characterName,
          characterBuildings,
        })
      ),
    })
  );

  return (
    <Toolbar
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, md: 0 },
      }}
    >
      <Typography variant="h6" noWrap component="div">
        {icon ?? null} {header}
      </Typography>

      <Divider />

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {plays.map((play) => (
          <PlayAccordion
            key={play.title}
            play={play}
            onCharacterBuildingSelect={handleCharacterBuildingSelect}
          />
        ))}
      </List>
    </Toolbar>
  );
};
