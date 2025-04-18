import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types";
import { useEffect, useState } from "react";
import { getBooksByAuthorId } from "../../../redux/thunks/bookThunks";
import { getCharactersByBookId } from "../../../redux/thunks/characterThunks";
import { getScenesByCharacterId } from "../../../redux/thunks/sceneThunks";
import {
  clearSelectedCharacterBuilding,
  setSelectedCharacterBuilding,
} from "../../../redux/slices/characterBuildingSlice";
import { v4 as uuidv4 } from "uuid";
import {
  createCharacterBuilding,
  getAllCharacterBuildings,
} from "../../../redux/thunks/characterBuildingThunks";
import { commonTranslationMap } from "../../../i18n/commonTranslationMap";
import { authors } from "../../../../tests/data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CreateCharacterBuildingModal = ({
  open,
  handleModalClose,
}: {
  open: boolean;
  handleModalClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [author, setAuthor] = useState<{ id: string; name: string } | null>(
    null
  );
  const [book, setBook] = useState<{ id: string; title: string } | null>(null);
  const [character, setCharacter] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [scene, setScene] = useState<{
    id: string;
    description: string;
    characters: { id: string; name: string }[];
  } | null>(null);

  const { books } = useSelector((state: RootState) => state.book);
  const { characters } = useSelector((state: RootState) => state.character);
  const { scenes } = useSelector((state: RootState) => state.scene);

  useEffect(() => {
    if (author?.id) {
      dispatch(getBooksByAuthorId(author.id));
    }
  }, [author, dispatch]);

  useEffect(() => {
    if (book?.id) {
      dispatch(getCharactersByBookId(book.id));
    }
  }, [book, dispatch]);

  useEffect(() => {
    if (character?.id) {
      dispatch(getScenesByCharacterId(character.id));
    }
  }, [character, dispatch]);

  const clearAndClose = () => {
    setAuthor(null);
    setBook(null);
    setCharacter(null);
    setScene(null);
    handleModalClose();
  };

  const currentLanguage = localStorage.getItem("language") ?? "es_gl";
  const translationMap = commonTranslationMap[currentLanguage];

  return (
    <div>
      <Modal
        open={open}
        onClose={clearAndClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={clearAndClose}>{translationMap.close}</button>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="author-label">{translationMap.author}</InputLabel>
            <Select
              labelId="author-label"
              variant="filled"
              value={author?.id ?? ""}
              onChange={(e) => {
                const selectedAuthor = authors.find(
                  (a) => a.id === e.target.value
                );
                if (!selectedAuthor) return;
                setAuthor(selectedAuthor);
                setBook(null);
                setCharacter(null);
                setScene(null);
                dispatch(getBooksByAuthorId(selectedAuthor.id));
              }}
              name="author"
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {author && books.length > 0 && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="book-label">{translationMap.book}</InputLabel>
              <Select
                labelId="book-label"
                variant="filled"
                value={book?.id ?? ""}
                onChange={(e) => {
                  const selectedBook = books.find(
                    (b) => b.id === e.target.value
                  );
                  if (!selectedBook) return;
                  setBook(selectedBook);
                  setCharacter(null);
                  setScene(null);
                  dispatch(getCharactersByBookId(selectedBook.id));
                }}
                name="book"
              >
                {books.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {book && characters.length > 0 && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="character-label">
                {translationMap.character}
              </InputLabel>
              <Select
                labelId="character-label"
                variant="filled"
                value={character?.id ?? ""}
                onChange={(e) => {
                  const selectedCharacter = characters.find(
                    (c) => c.id === e.target.value
                  );
                  if (!selectedCharacter) return;
                  setCharacter(selectedCharacter);
                  setScene(null);
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
          )}

          {character && scenes.length > 0 && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="scene-label">{translationMap.scene}</InputLabel>
              <Select
                labelId="scene-label"
                variant="filled"
                value={scene?.id ?? ""}
                onChange={(e) => {
                  const selectedScene = scenes.find(
                    (s) => s.id === e.target.value
                  );
                  if (!selectedScene) return;
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
            </FormControl>
          )}

          {scene && (
            <Grid>
              <Button
                color="primary"
                variant="outlined"
                size="small"
                sx={{ padding: 1, textTransform: "none", mt: 2 }}
                onClick={() => {
                  dispatch(clearSelectedCharacterBuilding());
                  const id = uuidv4();
                  if (!author || !book || !character || !scene) return;
                  dispatch(
                    createCharacterBuilding({
                      id,
                      character,
                      book,
                      scene,
                      author,
                    })
                  );
                  dispatch(getAllCharacterBuildings());
                  dispatch(
                    setSelectedCharacterBuilding({
                      id,
                      author,
                      book,
                      character,
                      scene,
                      relationshipCircumstances: [],
                      actionUnits: [],
                      center: "instinctive",
                    })
                  );
                  clearAndClose();
                }}
              >
                <span style={{ fontSize: 30, marginRight: 8 }}>+</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "light",
                    color: "primary.main",
                  }}
                >
                  {translationMap.create} {translationMap.character}
                </span>
              </Button>
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
};
