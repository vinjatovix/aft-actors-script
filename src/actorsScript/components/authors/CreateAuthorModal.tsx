import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types";
import { Box, Button, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { useFormValidation } from "../../../auth/hooks/useFormValidation";
import { createAuthor } from "../../../redux/thunks/authorThunks";
import { v4 as uuidv4 } from 'uuid';
import Loader from "../Loader";

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

export const CreateAuthorModal = ({
    open,
    handleModalClose
}: {
    open: boolean;
    handleModalClose: () => void;
}) => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch<AppDispatch>();
    const { validateForm, handleInputChange, formData, errors } =
        useFormValidation({
            name: '',
        });

    const { loading, error } = useSelector((state: RootState) => state.author);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createAuthor({ id: uuidv4(), ...formData }));
        if (!error) {
            handleModalClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="warning" onClick={handleModalClose}>
                        {t('close')}

                    </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField
                            label={t('author')}
                            name="name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    {errors?.name && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {errors.name}
                        </Typography>
                    )}
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                    <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        {loading ? (<Loader />) :

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
                                    {t('create')} {t('author')}
                                </span>
                            </Button>
                        }
                    </Grid>
                </form>
            </Box>


        </Modal >
    )
}
