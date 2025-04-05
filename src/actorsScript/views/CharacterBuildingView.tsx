import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { characterBuildingTranslationMap } from "../../auth/pages/translationMap";
import { SaveButton } from "../components/buttons/SaveButton";
import { RelationshipCircumstances } from "../components/characterBuildings/RelationshipCircumstances";
import { ActionUnits } from "../components/characterBuildings/ActionUnits";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  deleteCharacterBuilding,
  getAllCharacterBuildings,
  updateCharacterBuilding,
} from "../../redux/thunks/characterBuildingThunks";
import { Delete } from "@mui/icons-material";
import { clearSelectedCharacterBuilding } from "../../redux/slices/characterBuildingSlice";
import { CharacterBuildingHeader } from "../components/characterBuildings/CharacterBuildingHeader";

export const CharacterBuildingView = ({
  characterBuilding,
}: {
  characterBuilding: CharacterBuilding;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    center: characterBuilding.center,
    sceneCircumstances: characterBuilding.sceneCircumstances ?? "",
    previousCircumstances: characterBuilding.previousCircumstances ?? "",
    startingPoint: characterBuilding.startingPoint ?? "",
    relationshipCircumstances: (
      characterBuilding.relationshipCircumstances ?? []
    ).map((relation) => ({
      character: relation.character.id,
      circumstance: relation.circumstance,
    })),
    actionUnits: (characterBuilding.actionUnits ?? []).map((unit) => ({
      action: unit.action,
      strategies: unit.strategies ?? [],
    })),
  });

  const [relations, setRelations] = useState<
    { character: { id: string; name: string }; circumstance: string }[]
  >(characterBuilding.relationshipCircumstances);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRelationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedRelations = relations.map((relation, i) =>
      i === index ? { ...relation, [field]: value } : relation
    );
    setRelations(updatedRelations);
    setFormData({
      ...formData,
      relationshipCircumstances: updatedRelations.map((relation) => ({
        character: relation.character.id,
        circumstance: relation.circumstance,
      })),
    });
  };

  const handleSubmit = () => {
    dispatch(
      updateCharacterBuilding({
        id: characterBuilding.id,
        ...formData,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteCharacterBuilding(characterBuilding.id));
    dispatch(clearSelectedCharacterBuilding());
    dispatch(getAllCharacterBuildings());
  };

  const currentLanguage = localStorage.getItem("language") ?? "es_gl";
  const translationMap = characterBuildingTranslationMap[currentLanguage];

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 1, width: "100%" }}
    >
      <CharacterBuildingHeader
        name={characterBuilding.character.name}
        description={characterBuilding.scene.description}
        updatedAt={characterBuilding.metadata?.updatedAt}
      />
      <SaveButton text={translationMap.save} handleSubmit={handleSubmit} />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="center-label">
            {translationMap.center.label}
          </InputLabel>
          <Select
            labelId="center-label"
            variant="filled"
            value={formData.center}
            onChange={(e) => {
              const selectedCenter = e.target.value;
              setFormData({ ...formData, center: selectedCenter });
            }}
            name="center"
          >
            <MenuItem value="instinctive">
              {translationMap.center.instinctive}
            </MenuItem>
            <MenuItem value="mental">{translationMap.center.mental}</MenuItem>
            <MenuItem value="emotional">
              {translationMap.center.emotional}
            </MenuItem>
          </Select>
        </FormControl>

        {(
          [
            "sceneCircumstances",
            "previousCircumstances",
            "startingPoint",
          ] as Array<
            "sceneCircumstances" | "previousCircumstances" | "startingPoint"
          >
        ).map((field) => (
          <TextField
            key={field}
            name={field}
            type="text"
            variant="filled"
            fullWidth
            placeholder={translationMap[field].placeholder}
            label={translationMap[field].label}
            value={formData[field]}
            onChange={handleInputChange}
          />
        ))}

        <RelationshipCircumstances
          title={translationMap.relationshipCircumstances}
          relations={relations}
          setRelations={setRelations}
          handleRelationChange={handleRelationChange}
          characters={characterBuilding.scene.characters.filter(
            (character) => character.id !== characterBuilding.character.id
          )}
        />

        <ActionUnits formData={formData} setFormData={setFormData} />
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ mt: 10 }}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          <Delete sx={{ fontSize: 30, mr: 1 }} />
          <Typography fontSize={14} fontWeight="bold" color="secondary.main">
            {translationMap.delete}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
