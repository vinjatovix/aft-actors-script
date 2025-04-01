import { Box } from "@mui/material"
import { ReactNode } from "react"
import { SideBar } from '../components/sidebar/SideBar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const drawerWidth = 240;

export const CharacterBuildingsLayout = ({ children }: { children: ReactNode }) => {
    const { characterBuildings } = useSelector((state: RootState) => state.characterBuilding);

    return (
        <Box sx={{ display: 'flex' }}>



            <SideBar drawerWith={drawerWidth} header="Construccións" icon={<EngineeringIcon />} data={characterBuildings} />

            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                </Box>

                {children}
            </Box>

        </Box>
    )
}
