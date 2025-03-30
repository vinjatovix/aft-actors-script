import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllCharacters } from "../../redux/thunks/characterThunks";
import { Character } from "../../redux/interfaces/characterInterfaces";
import { CharacterCard } from "../components/characters/CharacterCard";

export const Characters = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { characters, loading, error } = useSelector((state: RootState) => state.character);

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);



  return (
    <div className="page">
      <img src="/assets/character.svg" alt="Icono dun persoaxe con máscara de hockey" width="50" height="50" />
      <h1>Characters</h1>

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
