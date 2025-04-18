import { Typography } from "@mui/material";
import { Scene } from "../../../redux/interfaces/sceneInterfaces";
import { getTimeAgo } from "../../../utils/getTimeAgo";

export const SceneCard = (scene: Scene) => {
  return (
    <div key={scene.id} className="card">
      {scene.metadata && (
        <Typography variant="body2" color="textSecondary">
          actualizado por {scene.metadata.updatedBy}{" "}
          {getTimeAgo(scene.metadata.updatedAt)}
        </Typography>
      )}
      <h1>
        {scene.characters?.[0]?.book?.title ?? "Unknown Title"} -{" "}
        {scene.characters?.[0]?.book?.author?.name ?? "Unknown Author"}
      </h1>
      <h2>{scene.description}</h2>
      <ul>
        {scene.characters.map((character) => (
          <li key={character.id}>
            <span>{character.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
