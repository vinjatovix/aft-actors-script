import { Delete } from "@mui/icons-material";
import {
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

export const Relation = ({
  translationMap,
  relation,
  index,
  handleRelationChange,
  relations,
  setRelations,
  handleRemoveRelation,
  characters,
}: {
  translationMap: {
    relationshipCircumstances: string;
    character: string;
    circumstance: string;
  };
  relation: {
    character: { id: string; name: string };
    circumstance: string;
  };
  index: number;
  handleRelationChange: (index: number, field: string, value: string) => void;
  relations: {
    character: { id: string; name: string };
    circumstance: string;
  }[];
  setRelations: React.Dispatch<
    React.SetStateAction<
      { character: { id: string; name: string }; circumstance: string }[]
    >
  >;
  handleRemoveRelation: (index: number) => void;
  characters: {
    id: string;
    name: string;
  }[];
}) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      key={relation.character.id}
      sx={{ mt: 1 }}
    >
      <Grid size={{ xs: 1 }}>
        <Button
          data-testid={`remove-relation-${index}`}
          variant="outlined"
          color="secondary"
          onClick={() => handleRemoveRelation(index)}
        >
          <Delete color="error" />
        </Button>
      </Grid>
      <Grid size={{ xs: 4 }}>
        {relation.character.id ? (
          <Typography variant="body1">{relation.character.name}</Typography>
        ) : (
          <FormControl fullWidth>
            <InputLabel id={`character-select-label-${index}`}>
              {translationMap.character}
            </InputLabel>
            <Select
              labelId={`character-select-label-${index}`}
              id={`character-select-${index}`}
              value={relation.character.id}
              onChange={(e) => {
                const selectedRelation = characters.find(
                  (character) => character.id === e.target.value
                );
                if (selectedRelation) {
                  const updatedRelations = relations.map((rel, i) =>
                    i === index
                      ? {
                          ...rel,
                          character: {
                            id: selectedRelation.id,
                            name: selectedRelation.name,
                          },
                        }
                      : rel
                  );
                  setRelations(updatedRelations);
                }
              }}
            >
              {characters
                .filter(
                  (character) =>
                    !relations.some(
                      (relation) => relation.character.id === character.id
                    )
                )
                .map((character) => (
                  <MenuItem key={character.id} value={character.id}>
                    {character.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid size={{ xs: 7 }}>
        <TextField
          fullWidth
          label={translationMap.circumstance}
          variant="filled"
          value={relation.circumstance}
          onChange={(e) =>
            handleRelationChange(index, "circumstance", e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
};
