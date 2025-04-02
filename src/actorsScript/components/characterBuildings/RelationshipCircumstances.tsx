import { Add, Delete } from "@mui/icons-material";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

export const RelationshipCircumstances = ({ setRelations, relations, handleRelationChange, title, relationshipCircumstances }: {
    setRelations: React.Dispatch<React.SetStateAction<{ character: { id: string; name: string }; circumstance: string }[]>>;
    relations: { character: { id: string; name: string }; circumstance: string }[];
    handleRelationChange: (index: number, field: string, value: string) => void;
    title?: string;
    relationshipCircumstances: {
        character: { id: string; name: string },
        circumstance: string;
    }[]

}) => {
    const handleAddRelation = () => {
        setRelations([
            ...relations,
            { character: { id: "", name: "" }, circumstance: "" },
        ]);
    };

    const handleRemoveRelation = (index: number) => {
        setRelations(relations.filter((_, i) => i !== index));
    };

    return (
        <Grid size={{ xs: 12 }}>
            <Grid container spacing={2} alignItems="baseline">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRelation}
                >
                    <Add />
                </Button>
                <Typography variant="h6">{title}</Typography>
            </Grid>
            {relations.map((relation, index) => (
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    key={relation.character.id}
                    sx={{ mt: 1 }}
                >
                    <Grid size={{ xs: 1 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleRemoveRelation(index)}
                        >
                            <Delete color="error" />
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel>Personaje</InputLabel>
                            <Select
                                value={relation.character.id}
                                onChange={(e) => {
                                    const selectedRelation = relationshipCircumstances.find(({ character }) => character.id === e.target.value);
                                    if (selectedRelation) {
                                        const updatedRelations = relations.map((rel, i) =>
                                            i === index ? { ...rel, character: { id: selectedRelation.character.id, name: selectedRelation.character.name } } : rel
                                        );
                                        setRelations(updatedRelations);
                                    }
                                }}
                            >
                                {relationshipCircumstances.map(({ character }) => (
                                    <MenuItem key={character.id} value={character.id}>
                                        {character.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 7 }}>
                        <TextField
                            fullWidth
                            label="Circunstancia"
                            variant="filled"
                            value={relation.circumstance}
                            onChange={(e) =>
                                handleRelationChange(index, "circumstance", e.target.value)
                            }
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}
