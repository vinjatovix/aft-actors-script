import { Grid, Typography } from "@mui/material";


export const AuthLayout = ({
    children, title
}: {
    children: React.ReactNode;
    title: string;
}) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="start"
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4,
                width: '100%',
            }}>

            <Grid
                className="box-shadow"
                size={{ xs: 12, sm: 8, md: 6, lg: 4, }}
                sx={{
                    width: { md: 450 },
                    backgroundColor: 'white', padding: 3, borderRadius: 2,
                }}
            >
                <Typography variant="h5" sx={{ mb: 1, }}>
                    {title}
                </Typography>
                {children}
            </Grid>
        </Grid>
    )
}
