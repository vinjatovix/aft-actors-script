// import { Delete } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, /* ListItemIcon */ ListItemText, Toolbar, Typography } from "@mui/material"
import { CharacterBuilding } from "../../../redux/interfaces/characterBuildingInterfaces"

export const SideBar = ({ drawerWith = 240, header = "Actors Script", icon, data }: {
    drawerWith?: number, header?: string, icon?: React.ReactNode, data?: CharacterBuilding[]

}) => {

    const plays = (data || []).map((play) => play?.character?.book)

    return (
        <Box
            component="nav"
            sx={{
                width: { sm: drawerWith },
                flexShrink: { sm: 0 },
            }}
        >
            <Drawer
                variant="permanent"
                open
                onClose={() => { }}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': {
                        width: drawerWith,
                        boxSizing: 'border-box',
                    },
                }}
            >

                <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" noWrap component="div">
                        {icon ?? null} {header}
                    </Typography>
                    <Divider />

                    <List>
                        {plays.map(play => (
                            <ListItem key={play.title} disablePadding sx={{ mt: 1 }}>
                                <ListItemButton>
                                    {/* <ListItemIcon>
                                        <Delete color="error" />
                                    </ListItemIcon> */}
                                    <Grid
                                        container

                                    >
                                        <ListItemText primary={play.title} />
                                        <ListItemText secondary={play.author.name} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Toolbar>



            </Drawer>
        </Box >
    )
}
