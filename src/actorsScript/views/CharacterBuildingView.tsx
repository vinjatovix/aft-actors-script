import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SaveOutlined, Delete, Add } from "@mui/icons-material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { CharacterBuilding } from "../../redux/interfaces/characterBuildingInterfaces";
import { getTimeAgo } from "../../utils/getTimeAgo";

export const CharacterBuildingView = ({ characterBuilding }: { characterBuilding: CharacterBuilding }) => {
    const [relations, setRelations] = useState<{ character: string, circumstance: string }[]>([]);
    const [actionUnits, setActionUnits] = useState<{ id: string, unit: string, strategies: string[] }[]>([]);

    const handleAddRelation = () => {
        setRelations([...relations, { character: "", circumstance: "" }]);
    };

    const handleRemoveRelation = (index: number) => {
        setRelations(relations.filter((_, i) => i !== index));
    };

    const handleRelationChange = (index: number, field: string, value: string) => {
        const updatedRelations = relations.map((relation, i) =>
            i === index ? { ...relation, [field]: value } : relation
        );
        setRelations(updatedRelations);
    };

    const handleAddActionUnit = () => {
        setActionUnits([...actionUnits, { id: uuidv4(), unit: "", strategies: [] }]);
    };

    const handleRemoveActionUnit = (index: number) => {
        setActionUnits(actionUnits.filter((_, i) => i !== index));
    };

    const handleActionUnitChange = (index: number, value: string) => {
        const updatedUnits = actionUnits.map((unit, i) =>
            i === index ? { ...unit, unit: value } : unit
        );
        setActionUnits(updatedUnits);
    };

    const handleStrategyChange = (unitIndex: number, strategyIndex: number, value: string) => {
        const updatedUnits = actionUnits.map((unit, i) => {
            if (i === unitIndex) {
                const updatedStrategies = [...unit.strategies];
                updatedStrategies[strategyIndex] = value;
                return { ...unit, strategies: updatedStrategies };
            }
            return unit;
        });
        setActionUnits(updatedUnits);
    };

    const handleAddStrategy = (unitIndex: number) => {
        const updatedUnits = actionUnits.map((unit, i) =>
            i === unitIndex ? { ...unit, strategies: [...unit.strategies, ""] } : unit
        );
        setActionUnits(updatedUnits);
    };

    return (
        <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, width: "100%" }}>
            <Grid>
                <Typography fontSize={39} fontWeight="light" color="primary.main">
                    {characterBuilding?.character?.name} en {characterBuilding?.scene?.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Actualizado {getTimeAgo(characterBuilding.metadata.updatedAt)}
                </Typography>
            </Grid>
            <Grid>
                <Button color="primary" variant="outlined" size="small" sx={{ padding: 1, textTransform: 'none' }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    <Typography fontSize={14} fontWeight="light" color="primary.main">
                        Guardar
                    </Typography>
                </Button>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="center-label">Centro</InputLabel>
                    <Select labelId="center-label" variant="filled">
                        <MenuItem value="instinctive">Instintivo</MenuItem>
                        <MenuItem value="mental">Mental</MenuItem>
                        <MenuItem value="emotional">Emocional</MenuItem>
                    </Select>
                </FormControl>
                <TextField type="text" variant="filled" fullWidth placeholder="Es la cena de cumpleaños del abuelo" label="Circunstancias de la escena" />
                <TextField type="text" variant="filled" fullWidth placeholder="El Doctor acaba de decirle a Brick que el abuelo sí tiene cáncer" label="Circunstancias previas" />
                <TextField type="text" variant="filled" fullWidth placeholder="Brick está medio borracho y solo quiere evadirse" label="Punto de partida" />

                <Grid size={{ xs: 12 }}>
                    <Grid container spacing={2} alignItems="baseline">
                        <Button variant="contained" color="primary" onClick={handleAddRelation} >
                            <Add />
                        </Button >
                        <Typography variant="h6">Circunstancias de Relación</Typography>
                    </Grid>
                    {relations.map((relation, index) => (
                        <Grid container spacing={2} alignItems="center" key={relation.character} sx={{ mt: 1 }}>
                            <Grid size={{ xs: 1 }}>
                                <Button variant="outlined" color="secondary" onClick={() => handleRemoveRelation(index)}>
                                    <Delete color="error" />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Personaje</InputLabel>
                                    <Select
                                        value={relation.character}
                                        onChange={(e) => handleRelationChange(index, "character", e.target.value)}
                                    >
                                        <MenuItem value="Juan">Juan</MenuItem>
                                        <MenuItem value="Yerma">Yerma</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 7 }}>
                                <TextField
                                    fullWidth
                                    label="Circunstancia"
                                    variant="filled"
                                    value={relation.circumstance}
                                    onChange={(e) => handleRelationChange(index, "circumstance", e.target.value)}
                                />
                            </Grid>

                        </Grid>
                    ))}

                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Grid container spacing={2} alignItems="baseline">
                        <Button variant="contained" color="primary" onClick={handleAddActionUnit} sx={{ mt: 2 }}>
                            <Add />
                        </Button>
                        <Typography variant="h6" sx={{ mt: 3 }}>Unidades de Acción</Typography>
                    </Grid>
                    {actionUnits.map((unit, unitIndex) => (
                        <Grid container spacing={2} alignItems="center" key={unit.id} sx={{ mt: 1 }}>
                            <Grid size={{ xs: 1 }}>
                                <Button variant="outlined" color="secondary" onClick={() => handleRemoveActionUnit(unitIndex)}>
                                    <Delete color="error" />
                                </Button>
                            </Grid>
                            <Grid size={{ xs: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Unidad de Acción"
                                    variant="filled"
                                    value={unit.unit}
                                    onChange={(e) => handleActionUnitChange(unitIndex, e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 6 }}>
                                <Grid container spacing={2} alignItems="baseline">
                                    <Typography variant="body2" sx={{ mb: 1 }}>Estrategias</Typography>
                                    <Button variant="contained" color="primary" onClick={() => handleAddStrategy(unitIndex)} sx={{ mt: 1 }}>
                                        <Add />
                                    </Button>
                                </Grid>
                                {unit.strategies.map((strategy, strategyIndex) => (
                                    <Grid container spacing={2} alignItems="center" key={uuidv4()}>
                                        <Grid size={{ xs: 8 }}>
                                            <TextField
                                                fullWidth
                                                label={`Estrategia ${strategyIndex + 1}`}
                                                variant="filled"
                                                value={strategy}
                                                onChange={(e) => handleStrategyChange(unitIndex, strategyIndex, e.target.value)}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 2 }}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    const updatedUnits = actionUnits.map((unit, i) => {
                                                        if (i === unitIndex) {
                                                            const updatedStrategies = unit.strategies.filter((_, sIndex) => sIndex !== strategyIndex);
                                                            return { ...unit, strategies: updatedStrategies };
                                                        }
                                                        return unit;
                                                    });
                                                    setActionUnits(updatedUnits);
                                                }}
                                            >
                                                <Delete color="error" />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ))}


                            </Grid>

                        </Grid>
                    ))}

                </Grid>
            </Grid>
        </Grid >
    );
};
