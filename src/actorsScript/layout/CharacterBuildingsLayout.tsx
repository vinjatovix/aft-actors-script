import { Box, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { SideBar } from '../components/sidebar/SideBar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { AssignmentOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

export const CharacterBuildingsLayout = ({
  children
}: {
  children: ReactNode;
}) => {
  const { t } = useTranslation('characterBuilding');

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: 'none' },
          position: 'fixed',
          top: 56,
          left: 16,
          zIndex: 1201
        }}
      >
        <AssignmentOutlined />
      </IconButton>

      <SideBar
        drawerWidth={drawerWidth}
        header={t('builds')}
        icon={<EngineeringIcon />}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          pl: 4,
          pr: 4,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        ></Box>

        {children}
      </Box>
    </Box>
  );
};
