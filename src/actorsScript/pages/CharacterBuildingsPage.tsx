import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllCharacterBuildings } from "../../redux/thunks/characterBuildingThunks";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { CharacterBuildingsLayout } from "../layout/CharacterBuildingsLayout";
import { Box, Typography } from "@mui/material";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { CharacterBuildingView } from "../views/CharacterBuildingView";
import { AddButton } from "../components/buttons/AddButton";
import { CreateCharacterBuildingModal } from "../components/characterBuildings/CreateCharacterBuildingModal";
import { CharacterBuildingMobileView } from "../views/CharacterBuildingMobileView.tsx/CharacterBuildingMobileView";

export const CharacterBuildingsPage = () => {
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
      <CharacterBuildingMobileView characterBuilding={characterBuildings[0]} />

      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          width: "calc(95vw - 240px)",
        }}
      >
        {loading && <p>Cargando construcciones...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !characterBuildings.length && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#666",
            }}
          >
            No hay construcciones disponibles
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
