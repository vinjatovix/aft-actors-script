import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { useEffect } from "react";
import { getAllCharacterBuildings } from "../../redux/thunks/characterBuildingThunks";
import { CharacterBuildingCard } from "../components/characterBuildings/CharacterBuildingCard";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { PageHeader } from "../components/PageHeader";
import { CharacterBuildingsLayout } from "../layout/CharacterBuildingsLayout";
import { Box } from "@mui/material";
import { NothingSelectedView } from '../views/NothingSelectedView';
import { CharacterBuildingView } from "../views/CharacterBuildingView";


export const CharacterBuildings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { characterBuildings, loading, error } = useSelector((state: RootState) => state.characterBuilding);

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

      </Box>

      <Box sx={{
        display: {
          xs: 'none',
          sm: 'block',
        },
        width: 'calc(95vw - 240px)',
      }}>
        {/* <PageHeader
            icon={<EngineeringIcon />}
            title="Construccións de persoaxe"
          /> */}

        {characterBuildings.length ? <CharacterBuildingView characterBuilding={characterBuildings[0]} /> :
          <NothingSelectedView />
        }









        {loading && <p>Cargando construcciones...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !characterBuildings.length && (
          <p>No hay construcciones disponibles</p>
        )}

        {/* {!loading && !!characterBuildings.length && (<div className="card-container">
          {characterBuildings.map((characterBuilding: CharacterBuilding) => (
            <CharacterBuildingCard
              key={characterBuilding.id}
              {...characterBuilding}
            />
          ))}
        </div>)} */}
      </Box>
    </CharacterBuildingsLayout>
  );
};
