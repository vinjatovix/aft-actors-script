import { Typography } from "@mui/material";
import { Character } from "../../../redux/interfaces/characterInterfaces";
import { getTimeAgo } from "../../../utils/getTimeAgo";

export const CharacterCard = (character: Character) => {
  return (
    <div className="card">
      {character.metadata && (
        <Typography variant="body2" color="textSecondary">
          actualizado por {character.metadata.updatedBy}{" "}
          {getTimeAgo(character.metadata.updatedAt)}
        </Typography>
      )}

      <h2>{character.name}</h2>
      <p>Obra: {character.book?.title}</p>
      <p>Autor: {character.book?.author.name}</p>
    </div>
  );
};
