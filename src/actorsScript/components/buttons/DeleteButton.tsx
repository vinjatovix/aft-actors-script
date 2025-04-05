import { Delete } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

export const DeleteButton = ({
  handleOnClick,
  testid = "delete-button",
}: {
  handleOnClick: () => void;
  testid?: string;
}) => {
  return (
    <Grid size={{ xs: 1 }} sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOnClick}
        data-testid={testid}
      >
        <Delete color="error" />
      </Button>
    </Grid>
  );
};
