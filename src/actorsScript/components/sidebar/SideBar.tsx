import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { CharacterBuildingsDrawer } from "../characterBuildings/characterBuildingsDrawer/CharacterBuildingsDrawer";

interface SideBarProps {
  drawerWidth?: number;
  header?: string;
  icon?: React.ReactNode;
  mobileOpen: boolean;
  handleDrawerToggle?: () => void;
}

export const SideBar = ({
  drawerWidth = 240,
  header = "Actors Script",
  icon,
  mobileOpen,
  handleDrawerToggle,
}: SideBarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerStyles = {
    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={drawerStyles}
        >
          <CharacterBuildingsDrawer icon={icon} header={header} />
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={drawerStyles}
        >
          <CharacterBuildingsDrawer icon={icon} header={header} />
        </Drawer>
      )}
    </Box>
  );
};
