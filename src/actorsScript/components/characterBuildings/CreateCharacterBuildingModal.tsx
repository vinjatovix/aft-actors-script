import { Box, FormControl, InputLabel, MenuItem, Modal, Select, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { getBookByAuthorId } from '../../../redux/thunks/bookThunks';
import { getCharactersByBookId } from '../../../redux/thunks/characterThunks';
import { getScenesByCharacterId } from '../../../redux/thunks/sceneThunks';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CreateCharacterBuildingModal = ({
    open,
    handleModalClose,
}: {
    open: boolean
    handleModalClose: () => void
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [author, setAuthor] = useState("");
    const [book, setBook] = useState("");
    const [character, setCharacter] = useState("");
    const [scene, setScene] = useState("");

    const { books } = useSelector((state: RootState) => state.book);
    const { characters } = useSelector((state: RootState) => state.character);
    const { scenes } = useSelector((state: RootState) => state.scene);
    console.log(books)

    useEffect(() => {
        if (author) {
            dispatch(getBookByAuthorId(author));
        }
    }, [author, dispatch]);

    useEffect(() => {
        if (book) {
            dispatch(getCharactersByBookId(book));
        }
    }, [book, dispatch]);

    useEffect(() => {
        if (character) {
            dispatch(getScenesByCharacterId(character));
        }
    }, [character, dispatch]);



    return (
        <div>

            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button onClick={handleModalClose}>Pechar</button>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="author-label">DramaturgX</InputLabel>
                        <Select
                            labelId="author-label"
                            variant="filled"
                            value={author}
                            onChange={(e) => {
                                const selectedAuthor = e.target.value;
                                setAuthor(selectedAuthor);
                                setBook("");
                                setCharacter("");
                                setScene("");
                                dispatch(getBookByAuthorId(selectedAuthor));

                            }}
                            name="author"
                        >
                            <MenuItem value="8d91c3c9-f531-4c52-9a88-85cbbeb22546">Federico García Lorca</MenuItem>
                            <MenuItem value="author2">Author 2</MenuItem>
                        </Select>
                    </FormControl>


                    {books.length > 0 && <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="book-label">Obra</InputLabel>
                        <Select
                            labelId="book-label"
                            variant="filled"
                            value={book}
                            onChange={(e) => {
                                const selectedBook = e.target.value;
                                setBook(selectedBook);
                                setCharacter("");
                                setScene("");
                                dispatch(getCharactersByBookId(selectedBook));
                            }}
                            name="book"
                        >
                            {books.map((book) => (
                                <MenuItem key={book.id} value={book.id}>
                                    {book.title}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>}

                    {characters.length > 0 && <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="character-label">Personaxe</InputLabel>
                        <Select
                            labelId="character-label"
                            variant="filled"
                            value={character}
                            onChange={(e) => {
                                const selectedCharacter = e.target.value;
                                setCharacter(selectedCharacter);
                                setScene("");
                            }}

                            name="character"
                        >
                            {characters.map((character) => (
                                <MenuItem key={character.id} value={character.id}>
                                    {character.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    }

                    {scenes.length > 0 && <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="scene-label">Escea</InputLabel>
                        <Select
                            labelId="scene-label"
                            variant="filled"
                            value={scene}
                            onChange={(e) => {
                                const selectedScene = e.target.value;
                                setScene(selectedScene);
                            }}
                            name="scene"
                        >
                            {scenes.map((scene) => (
                                <MenuItem key={scene.id} value={scene.id}>
                                    {scene.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>}

                </Box>
            </Modal>
        </div >
    )
}
