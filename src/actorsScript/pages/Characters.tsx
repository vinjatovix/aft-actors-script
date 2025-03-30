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

  if (loading) {
    return <div>Cargando libros...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <img src="/assets/character.svg" alt="Icono dun persoaxe con máscara de hockey" width="50" height="50" />
      <h1>Characters</h1>
      {characters.length === 0 ? (
        <p>No hay persoaxes dispoñibles</p>
      ) : (
        characters.map((character: Character) => (
          <CharacterCard
            key={character.id}
            {...character}
          />
        ))
      )}
    </>
  );
};
