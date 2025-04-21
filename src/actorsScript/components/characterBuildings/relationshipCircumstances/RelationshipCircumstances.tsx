import { Grid } from '@mui/material';
import { RelationshipCircumstancesHeader } from './RelationshipCircumstancesHeader';
import { Relation } from './Relation';

export const RelationshipCircumstances = ({
  setRelations,
  relations,
  handleRelationChange,
  characters,
  setFormData
}: {
  setRelations: React.Dispatch<
    React.SetStateAction<
      { character: { id: string; name: string }; circumstance: string }[]
    >
  >;
  relations: {
    character: { id: string; name: string };
    circumstance: string;
  }[];
  handleRelationChange: (index: number, field: string, value: string) => void;
  characters: {
    id: string;
    name: string;
  }[];
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
}) => {
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
    <Grid size={{ xs: 12 }}>
      <RelationshipCircumstancesHeader handleAddRelation={handleAddRelation} />
      {relations?.map((relation, index) => (
        <Relation
          key={relation.character.id}
          relation={relation}
          relations={relations}
          index={index}
          handleRelationChange={handleRelationChange}
          handleRemoveRelation={handleRemoveRelation}
          characters={characters.filter(
            (character) =>
              !relations.some(
                (relation) => relation.character.id === character.id
              )
          )}
          setRelations={setRelations}
        />
      ))}
    </Grid>
  );
};
