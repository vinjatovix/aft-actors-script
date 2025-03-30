import { Character } from '../../../redux/interfaces/characterInterfaces'

export const CharacterCard = (character: Character) => {
    return (
        <div className="character-card">
            <h2>{character.name}</h2>
            <p>Obra: {character.book.title}</p>
            <p>Autor: {character.book.author.name}</p>
            <small>{new Date(character.metadata.updatedAt).toLocaleDateString()} - {character.metadata.updatedBy} </small>
        </div>
    )
}
