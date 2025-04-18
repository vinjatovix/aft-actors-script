import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { CharacterBuilding } from "../../../redux/interfaces/characterBuildingInterfaces";
import { ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCharacterBuilding,
  setSelectedCharacterBuilding,
} from "../../../redux/slices/characterBuildingSlice";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../redux/types";
import { getAllCharacterBuildings } from "../../../redux/thunks/characterBuildingThunks";

export const SideBar = ({
  drawerWidth = 240,
  header = "Actors Script",
  icon,
}: {
  drawerWidth?: number;
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

  useEffect(() => {}, [characterBuildings]);

  const constructionsByPlay = characterBuildings?.reduce(
    (acc, characterBuilding) => {
      const title = characterBuilding?.character?.book?.title;
      if (!title) return acc;
      const characterName = characterBuilding?.character?.name;
      if (!acc[title]) {
        acc[title] = {
          [characterName]: [characterBuilding],
        };
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
    ([playName, characters]) => {
      const characterList = Object.entries(characters).map(
        ([characterName, characterBuildings]) => {
          return {
            characterName,
            characterBuildings,
          };
        }
      );
      return {
        title: playName,
        characters: characterList,
      };
    }
  );

  const handleCharacterBuildingSelect = (building: CharacterBuilding) => {
    return () => {
      dispatch(clearSelectedCharacterBuilding());
      dispatch(setSelectedCharacterBuilding(building));
    };
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        open
        onClose={() => {}}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {icon ?? null} {header}
          </Typography>
          <Divider />

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {[...plays].map((play, index) => (
              <Accordion
                key={play.title}
                sx={{
                  width: "100%",
                  padding: 0,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <ListItemText primary={play.title} />
                </AccordionSummary>

                <AccordionDetails sx={{ padding: 0 }}>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {play.characters.map((character, index) => (
                      <Accordion
                        key={character.characterName}
                        sx={{ width: "100%", mb: 1 }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                        >
                          <ListItemText primary={character.characterName} />
                        </AccordionSummary>
                        <AccordionDetails>
                          {character.characterBuildings.map((building) => (
                            <ListItem
                              key={building.id}
                              disablePadding
                              sx={{ mt: 1 }}
                            >
                              <ListItemButton
                                onClick={handleCharacterBuildingSelect(
                                  building
                                )}
                              >
                                <ListItemText
                                  primary={building.scene.description}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </Toolbar>
      </Drawer>
    </Box>
  );
};
