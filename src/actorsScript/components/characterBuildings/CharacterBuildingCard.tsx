import { CharacterBuilding } from '../../../redux/interfaces/characterBuildingInterfaces';

export const CharacterBuildingCard = (characterBuilding: CharacterBuilding) => {
    return (
        <div key={characterBuilding.id} className="card">
            <div className="card-header">
                <h2>{characterBuilding.character.name}</h2>
                <small>{new Date(characterBuilding.metadata.updatedAt).toLocaleDateString()} - {characterBuilding.metadata.updatedBy}</small>
            </div>
            {/* <strong>Interprete:</strong>
            <p>{characterBuilding.actor.username}</p> */}

            <strong>Escena:</strong>
            <p>{characterBuilding.scene.description}</p>


            <strong>Centro:</strong>
            <p>{characterBuilding.center}</p>

            <strong>
                Circunstancias de la escena:
            </strong>
            <p>
                {characterBuilding.sceneCircumstances}
            </p>
            <strong>
                Circunstancias previas:
            </strong>
            <p>
                {characterBuilding.previousCircumstances}
            </p>
            <ul>
                <strong>
                    Circunstancias de relación:
                </strong>
                {characterBuilding.relationshipCircumstances.map(
                    (relationshipCircumstance) => (
                        <li key={relationshipCircumstance.character.id}>
                            {relationshipCircumstance.character.name}:
                            {relationshipCircumstance.circumstance}
                        </li>
                    )
                )}
            </ul>
            <ul>
                <strong>
                    Unidades de acción:
                </strong>
                {characterBuilding.actionUnits.map((actionUnit: {
                    action: string;
                    strategies: string[];
                }) => (
                    <li key={actionUnit.action}>
                        <ul>
                            {actionUnit.action}:
                            {actionUnit.strategies.map((strategy) => (
                                <li key={strategy}><small>
                                    {strategy}
                                </small>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div >
    )
}
