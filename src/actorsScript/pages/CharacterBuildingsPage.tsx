import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/types';
import { useEffect, useState } from 'react';
import { getAllCharacterBuildings } from '../../redux/thunks/characterBuildingThunks';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { CharacterBuildingsLayout } from '../layout/CharacterBuildingsLayout';
import { Box, Typography } from '@mui/material';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { CharacterBuildingView } from '../views/CharacterBuildingView';
import { AddButton } from '../components/buttons/AddButton';
import { CreateCharacterBuildingModal } from '../components/characterBuildings/CreateCharacterBuildingModal';
import { useTranslation } from 'react-i18next';

export const CharacterBuildingsPage = () => {
  const { t } = useTranslation('characterBuilding');
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { characterBuildings, loading, error, selectedCharacterBuilding } =
    useSelector((state: RootState) => state.characterBuilding);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getAllCharacterBuildings());
    }
  }, [dispatch, token]);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <CharacterBuildingsLayout>
      <Box
        sx={{
          width: { xs: '100%', sm: 'calc(95vw - 240px)' }
        }}
      >
        {loading && <p>{t('loading')}</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !characterBuildings.length && (
          <Typography
            sx={{
              textAlign: 'center',
              color: '#666'
            }}
          >
            {t('noAvailable')}
          </Typography>
        )}

        {selectedCharacterBuilding ? (
          <CharacterBuildingView
            characterBuilding={selectedCharacterBuilding}
          />
        ) : (
          <NothingSelectedView />
        )}

        <AddButton icon={<EngineeringIcon />} handleClick={handleModalOpen} />
      </Box>
      {modalOpen && (
        <CreateCharacterBuildingModal
          open={modalOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </CharacterBuildingsLayout>
  );
};
