import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { useEffect } from "react";
import { getAllCharacterBuildings } from "../../redux/thunks/characterBuildingThunks";
import { CharacterBuildingCard } from "../components/characterBuildings/CharacterBuildingCard";

export const CharacterBuildings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { characterBuildings, loading, error } = useSelector((state: RootState) => state.characterBuilding);

  useEffect(() => {
    dispatch(getAllCharacterBuildings());
  }, [dispatch]);

  return (
    <div className="page">
      <img src="/assets/character-building.svg" alt="Icono dun obreiro e un libro" width="50" height="50" />
      <h1>Character Buildings</h1>

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
