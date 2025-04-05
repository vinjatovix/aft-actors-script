import { Grid } from "@mui/material";
import { RelationshipCircumstancesHeader } from "./RelationshipCircumstancesHeader";
import { Relation } from "./Relation";

export const RelationshipCircumstances = ({
  translationMap,
  setRelations,
  relations,
  handleRelationChange,
  characters,
}: {
  translationMap: {
    relationshipCircumstances: string;
    character: string;
    circumstance: string;
  };
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
}) => {
  const handleAddRelation = () => {
    setRelations([
      ...relations,
      { character: { id: "", name: "" }, circumstance: "" },
    ]);
  };

  const handleRemoveRelation = (index: number) => {
    setRelations(relations.filter((_, i) => i !== index));
  };

  return (
    <Grid size={{ xs: 12 }}>
      <RelationshipCircumstancesHeader
        translationMap={translationMap}
        handleAddRelation={handleAddRelation}
      />
      {relations?.map((relation, index) => (
        <Relation
          key={relation.character.id}
          relation={relation}
          relations={relations}
          index={index}
          translationMap={translationMap}
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
