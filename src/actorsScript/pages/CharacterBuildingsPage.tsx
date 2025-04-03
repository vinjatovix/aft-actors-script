import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { useEffect, useState } from "react";
import { getAllCharacterBuildings } from "../../redux/thunks/characterBuildingThunks";
import { CharacterBuildingCard } from "../components/characterBuildings/CharacterBuildingCard";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { PageHeader } from "../components/PageHeader";
import { CharacterBuildingsLayout } from "../layout/CharacterBuildingsLayout";
import { Box, Typography } from "@mui/material";
import { NothingSelectedView } from '../views/NothingSelectedView';
import { CharacterBuildingView } from "../views/CharacterBuildingView";
import { AddButton } from "../components/buttons/AddButton";
import { CreateCharacterBuildingModal } from "../components/characterBuildings/CreateCharacterBuildingModal";


export const CharacterBuildings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characterBuildings, loading, error } = useSelector((state: RootState) => state.characterBuilding);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCharacterBuildings());
  }, [dispatch]);



  return (
    <CharacterBuildingsLayout>

      <Box sx={{
        display: {
          xs: 'block',
          sm: 'none',
          md: 'none',

        }
      }}>

        <PageHeader
          icon={<EngineeringIcon />}
          title="Construccións de persoaxe"
        />

        {loading && <p>Cargando construcciones...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !characterBuildings.length && (
          <p>No hay construcciones disponibles</p>
        )}

        {!loading && !!characterBuildings.length && (<div className="card-container">
          {characterBuildings.map((characterBuilding: CharacterBuilding) => (
            <CharacterBuildingCard
              key={characterBuilding.id}
              {...characterBuilding}
            />
          ))}
        </div>)}

        <AddButton icon={<EngineeringIcon />} />

      </Box>

      <Box sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
        width: 'calc(95vw - 240px)',
      }}>
        {loading && <p>Cargando construcciones...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !characterBuildings.length && (
          <Typography
            sx={{
              textAlign: 'center',
              color: '#666',
            }}
          >No hay construcciones disponibles
          </Typography>
        )}

        {characterBuildings.length
          ? <CharacterBuildingView characterBuilding={characterBuildings[0]} />
          : <NothingSelectedView />
        }



        <AddButton icon={<EngineeringIcon />}
          handleClick={handleModalOpen}

        />









      </Box>

      {modalOpen && (
        <CreateCharacterBuildingModal
          open={modalOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </CharacterBuildingsLayout >
  );
};
