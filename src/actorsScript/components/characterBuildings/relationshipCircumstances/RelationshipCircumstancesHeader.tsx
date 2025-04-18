import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";

export const RelationshipCircumstancesHeader = ({
  translationMap,
  handleAddRelation,
}: {
  translationMap: {
    relationshipCircumstances: string;
  };
  handleAddRelation: () => void;
}) => {
  return (
    <Grid container spacing={2} alignItems="baseline">
      <Button
        data-testid="add-relation"
        size="small"
        variant="contained"
        color="primary"
        onClick={handleAddRelation}
      >
        <Add />
      </Button>
      <Typography variant="h6">
        {translationMap.relationshipCircumstances}
      </Typography>
    </Grid>
  );
};
