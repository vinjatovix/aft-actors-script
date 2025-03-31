import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { useEffect } from "react";
import { getAllCharacterBuildings } from "../../redux/thunks/characterBuildingThunks";
import { CharacterBuildingCard } from "../components/characterBuildings/CharacterBuildingCard";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { PageHeader } from "../components/PageHeader";


export const CharacterBuildings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { characterBuildings, loading, error } = useSelector((state: RootState) => state.characterBuilding);

  useEffect(() => {
    dispatch(getAllCharacterBuildings());
  }, [dispatch]);

  return (
    <div className="page">
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

    </div>
  );
};
