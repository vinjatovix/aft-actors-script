import { Box } from "@mui/material";
import { ReactNode } from "react";
import { SideBar } from "../components/sidebar/SideBar";
import EngineeringIcon from "@mui/icons-material/Engineering";

const drawerWidth = 240;

export const CharacterBuildingsLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar
        drawerWidth={drawerWidth}
        header="Construccións"
        icon={<EngineeringIcon />}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>

        {children}
      </Box>
    </Box>
  );
};
