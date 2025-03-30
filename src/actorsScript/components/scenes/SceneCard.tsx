import { Scene } from "../../../redux/interfaces/sceneInterfaces"

export const SceneCard = (scene: Scene) => {
  return (
    <div key={scene.id} className="card">
      <h1>{scene.characters[0].book.title} - {scene.characters[0].book.author.name}</h1>
      <small>{new Date(scene.metadata.updatedAt).toLocaleDateString()} - {scene.metadata.updatedBy}</small>
      <h2>{scene.description}</h2>
      <ul>
        {scene.characters.map((character) => (
          <li key={character.id}>
            <span>{character.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
