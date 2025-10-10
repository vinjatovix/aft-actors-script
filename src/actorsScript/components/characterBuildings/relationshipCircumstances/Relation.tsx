import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import React from 'react';
import { DeleteButton } from '../../buttons/DeleteButton';
import { useTranslation } from 'react-i18next';

export const Relation = ({
  relation,
  index,
  handleRelationChange,
  relations,
  setRelations,
  handleRemoveRelation,
  characters
}: {
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
  const { t } = useTranslation('characterBuilding');

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      key={relation.character.id}
      sx={{ mt: 1 }}
    >
      <Grid size={{ xs: 1 }}>
        <DeleteButton
          handleOnClick={() => handleRemoveRelation(index)}
          testid={`remove-relation-${index}`}
        />
      </Grid>

      <Grid size={{ xs: 3 }}>
        {relation.character.id ? (
          <Typography variant="body1">{relation.character.name}</Typography>
        ) : (
          <FormControl fullWidth>
            <InputLabel id={`character-select-label-${index}`}>
              {t('character')}
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
                            name: selectedRelation.name
                          }
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
      <Grid size={{ xs: 8 }}>
        <TextField
          fullWidth
          label={t('circumstance')}
          variant="filled"
          multiline
          minRows={1} // cantidad mínima de líneas visibles
          value={relation.circumstance}
          onChange={(e) =>
            handleRelationChange(index, 'circumstance', e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
};
