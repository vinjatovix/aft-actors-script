import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { Relation } from './Relation';
import { Add } from '@mui/icons-material';

type RelationType = {
  character: { id: string; name: string };
  circumstance: string;
};

type CharacterType = {
  id: string;
  name: string;
};

type RelationshipCircumstancesProps = {
  setRelations: React.Dispatch<React.SetStateAction<RelationType[]>>;
  relations: RelationType[];
  handleRelationChange: (index: number, field: string, value: string) => void;
  characters: CharacterType[];
  setFormData: React.Dispatch<
    React.SetStateAction<{
      center: string;
      sceneCircumstances: string;
      previousCircumstances: string;
      startingPoint: string;
      relationshipCircumstances: { character: string; circumstance: string }[];
      actionUnits: { action: string; strategies: string[] }[];
    }>
  >;
};

export const RelationshipCircumstances = ({
  setRelations,
  relations,
  handleRelationChange,
  characters,
  setFormData
}: RelationshipCircumstancesProps) => {
  const { t } = useTranslation('characterBuilding');

  const handleAddRelation = () => {
    setRelations([
      ...relations,
      { character: { id: '', name: '' }, circumstance: '' }
    ]);
  };

  const handleRemoveRelation = (index: number) => {
    const updatedRelations = relations.filter((_, i) => i !== index);
    setRelations(updatedRelations);

    setFormData((prevFormData) => ({
      ...prevFormData,
      relationshipCircumstances: updatedRelations.map((relation) => ({
        character: relation.character.id,
        circumstance: relation.circumstance
      }))
    }));
  };

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          {t('relationshipCircumstances')}
        </Typography>
      </Grid>

      {relations.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t('relationshipCircumstances.empty')}
        </Typography>
      )}

      {relations.map((relation: RelationType, index: number) => (
        <Accordion key={`${relation.character.id}`} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">
              {relation.character.name || t('relationshipCircumstances')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'background.paper', p: 2 }}>
            <Relation
              relation={relation}
              index={index}
              relations={relations}
              handleRelationChange={handleRelationChange}
              handleRemoveRelation={handleRemoveRelation}
              characters={characters.filter(
                (character: CharacterType) =>
                  !relations.some(
                    (r: RelationType) => r.character.id === character.id
                  )
              )}
              setRelations={setRelations}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        sx={{ mt: 2 }}
        startIcon={<Add />}
        variant="outlined"
        onClick={handleAddRelation}
      >
        {t('add')}
      </Button>
    </Grid>
  );
};
