import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCharacters } from "../../redux/thunks/characterThunks";
import { Character } from "../../redux/interfaces/characterInterfaces";
import { CharacterCard } from "../components/characters/CharacterCard";
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import { PageHeader } from "../components/PageHeader";


export const Characters = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { characters, loading, error } = useSelector((state: RootState) => state.character);

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);



  return (
    <div className="page">
      <PageHeader
        icon={<Groups3OutlinedIcon />}
        title="Personajes"
      />

      {loading && <p>Cargando personajes...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !characters.length && (
        <p>No hay personajes disponibles</p>
      )}
      {!loading && !!characters.length && (
        <div className="card-container">
          {characters.map((character: Character) => (
            <CharacterCard
              key={character.id}
              {...character}
            />
          ))}
        </div>
      )}
    </div>
  );
};
