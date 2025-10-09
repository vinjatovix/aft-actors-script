import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/types';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useFormValidation } from '../../../auth/hooks/useFormValidation';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader';
import { getAllAuthors } from '../../../redux/thunks/authorThunks';
import { useEffect, useState } from 'react';
import { createBook } from '../../../redux/thunks/bookThunks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export const CreateBookModal = ({
  open,
  handleModalClose
}: {
  open: boolean;
  handleModalClose: () => void;
}) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch<AppDispatch>();
  const [author, setAuthor] = useState<{ id: string; name: string } | null>(
    null
  );
  const { validateForm, handleInputChange, formData, errors } =
    useFormValidation({
      title: '',
      author: '',
      isbn: '',
      releaseDate: '',
      pages: 0
    });

  const { authors } = useSelector((state: RootState) => state.author);
  const { loading, error } = useSelector((state: RootState) => state.book);

  useEffect(() => {
    if (open) {
      dispatch(getAllAuthors());
    }
  }, [open, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!author) return;

    dispatch(
      createBook({
        id: uuidv4(),
        title: formData.title,
        author: formData.author,
        isbn: formData.isbn,
        releaseDate: formData.releaseDate,
        pages: formData.pages
      })
    );
    if (!error) {
      handleModalClose();
      setAuthor(null);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleModalClose}
          >
            {t('close')}
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="author-label">{t('author')}</InputLabel>
            <Select
              labelId="author-label"
              variant="filled"
              value={author?.id ?? ''}
              onChange={(e) => {
                const selectedAuthor = authors.find(
                  (a) => a.id === e.target.value
                );
                if (!selectedAuthor) return;
                setAuthor(selectedAuthor);
                handleInputChange({
                  target: {
                    name: 'author',
                    value: selectedAuthor.id
                  }
                } as React.ChangeEvent<HTMLInputElement>);
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
          {author && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label={t('book')}
                  name="title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </FormControl>
              {errors?.title && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.title}
                </Typography>
              )}
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label="ISBN"
                  name="isbn"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.isbn}
                  onChange={handleInputChange}
                />
              </FormControl>
              {errors?.isbn && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.isbn}
                </Typography>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label={t('releaseDate')}
                  name="releaseDate"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                />
              </FormControl>
              {errors?.releaseDate && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.releaseDate}
                </Typography>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  label={t('pages')}
                  name="pages"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.pages || ''}
                  onChange={handleInputChange}
                />
              </FormControl>
              {errors?.pages && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors.pages}
                </Typography>
              )}
              {formData.title &&
                formData.author &&
                formData.isbn &&
                formData.releaseDate &&
                !!formData.pages && (
                  <Grid
                    sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none', mt: 2 }}
                        type="submit"
                        aria-label="submit"
                      >
                        <span style={{ fontSize: 30, marginRight: 8 }}>+</span>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 'light',
                            color: 'primary.main'
                          }}
                        >
                          {t('create')} {t('book')}
                        </span>
                      </Button>
                    )}
                  </Grid>
                )}
            </>
          )}
        </form>
      </Box>
    </Modal>
  );
};
