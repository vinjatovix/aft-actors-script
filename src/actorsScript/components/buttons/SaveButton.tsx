import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"

export const SaveButton = ({ text, handleSubmit }: {
    text: string,
    handleSubmit: () => void
}) => {
    return (
        <Grid>
            <Button
                color="primary"
                variant="outlined"
                size="small"
                sx={{ padding: 1, textTransform: "none" }}
                onClick={handleSubmit}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                <Typography fontSize={14} fontWeight="light" color="primary.main">
                    {text}
                </Typography>
            </Button>
        </Grid>
    )
}
