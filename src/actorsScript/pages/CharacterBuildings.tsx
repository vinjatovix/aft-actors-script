import { characterBuildings } from "../../../tests/data";

export const CharacterBuildings = () => {
  return (
    <div>
      <img src="/src/assets/character-building.svg" alt="Icono dun obreiro e un libro" width="50" height="50" />
      <h1>Character Buildings</h1>
      {characterBuildings.map((characterBuilding) => (
        <div key={characterBuilding.id}>
          <h2>Personaje: {characterBuilding.character}</h2>
          <p>Escena: {characterBuilding.scene}</p>
          <p>Actor: {characterBuilding.actor}</p>
          <p>Centro: {characterBuilding.center}</p>
          <p>
            Circunstancias de la escena: {characterBuilding.sceneCircumstances}
          </p>
          <p>
            Circunstancias previas: {characterBuilding.previousCircumstances}
          </p>
          <ul>
            Circunstancias de relación:{" "}
            {characterBuilding.relationshipCircumstances.map(
              (relationshipCircumstance) => (
                <li key={relationshipCircumstance.character}>
                  {relationshipCircumstance.character}:{" "}
                  {relationshipCircumstance.circumstance}
                </li>
              )
            )}
          </ul>
          <ul>
            Unidades de acción:
            {characterBuilding.actionUnits.map((actionUnit) => (
              <li key={actionUnit.action}>
                <ul>
                  {actionUnit.action}:
                  {actionUnit.strategies.map((strategy) => (
                    <li key={strategy}>{strategy}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
