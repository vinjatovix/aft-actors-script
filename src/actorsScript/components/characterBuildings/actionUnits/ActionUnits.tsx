import { Add } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { characterBuildingTranslationMap } from "../../../../i18n/translationMap";
import { useState } from "react";
import { DeleteButton } from "../../buttons/DeleteButton";

interface ActionUnit {
  id: string;
  action: string;
  strategies: { id: string; text: string }[];
}

interface FormData {
  center: string;
  sceneCircumstances: string;
  previousCircumstances: string;
  startingPoint: string;
  relationshipCircumstances: { character: string; circumstance: string }[];
  actionUnits: { action: string; strategies: string[] }[];
}

interface ActionUnitsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const ActionUnits = ({ formData, setFormData }: ActionUnitsProps) => {
  const [actionUnits, setActionUnits] = useState<ActionUnit[]>(
    formData?.actionUnits.map((unit) => ({
      id: uuidv4(),
      action: unit.action,
      strategies: unit.strategies.map((strategy) => ({
        id: uuidv4(),
        text: strategy,
      })),
    }))
  );

  const currentLanguage = localStorage.getItem("language") ?? "es_gl";
  const translationMap = characterBuildingTranslationMap[currentLanguage];

  const updateFormData = (updatedUnits: ActionUnit[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      actionUnits: updatedUnits.map((unit) => ({
        action: unit.action,
        strategies: unit.strategies.map((strategy) => strategy.text),
      })),
    }));
  };

  const handleAddActionUnit = () => {
    const newUnit: ActionUnit = { id: uuidv4(), action: "", strategies: [] };
    const updatedUnits = [...actionUnits, newUnit];
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleRemoveActionUnit = (id: string) => {
    const updatedUnits = actionUnits.filter((unit) => unit.id !== id);
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleActionUnitChange = (unitId: string, value: string) => {
    const updatedUnits = actionUnits.map((unit) =>
      unit.id === unitId ? { ...unit, action: value } : unit
    );
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleAddStrategy = (unitId: string) => {
    const updatedUnits = actionUnits.map((unit) =>
      unit.id === unitId
        ? {
            ...unit,
            strategies: [...unit.strategies, { id: uuidv4(), text: "" }],
          }
        : unit
    );
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleStrategyChange = (
    unitId: string,
    strategyId: string,
    value: string
  ) => {
    const updatedUnits = actionUnits.map((unit) => {
      if (unit.id === unitId) {
        const updatedStrategies = unit.strategies.map((strategy) =>
          strategy.id === strategyId ? { ...strategy, text: value } : strategy
        );
        return { ...unit, strategies: updatedStrategies };
      }
      return unit;
    });
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleRemoveStrategy = (unitId: string, strategyId: string) => {
    const updatedUnits = actionUnits.map((unit) => {
      if (unit.id === unitId) {
        const updatedStrategies = unit.strategies.filter(
          (strategy) => strategy.id !== strategyId
        );
        return { ...unit, strategies: updatedStrategies };
      }
      return unit;
    });
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2} alignItems="baseline" size={{ xs: 12 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddActionUnit}
          sx={{ mt: 2 }}
        >
          <Add />
        </Button>
        <Typography variant="h6" sx={{ mt: 3 }}>
          {translationMap.actionUnits.label}
        </Typography>
      </Grid>
      {actionUnits.map((unit) => (
        <ActionUnitRow
          key={unit.id}
          unit={unit}
          translationMap={translationMap}
          onActionChange={handleActionUnitChange}
          onAddStrategy={handleAddStrategy}
          onStrategyChange={handleStrategyChange}
          onRemoveStrategy={handleRemoveStrategy}
          onRemoveUnit={handleRemoveActionUnit}
        />
      ))}
    </Grid>
  );
};

interface ActionUnitRowProps {
  unit: ActionUnit;
  translationMap: {
    actionUnits: {
      action: string;
      strategies: string;
      strategy: string;
      label: string;
    };
  };
  onActionChange: (unitId: string, value: string) => void;
  onAddStrategy: (unitId: string) => void;
  onStrategyChange: (unitId: string, strategyId: string, value: string) => void;
  onRemoveStrategy: (unitId: string, strategyId: string) => void;
  onRemoveUnit: (unitId: string) => void;
}

const ActionUnitRow = ({
  unit,
  translationMap,
  onActionChange,
  onAddStrategy,
  onStrategyChange,
  onRemoveStrategy,
  onRemoveUnit,
}: ActionUnitRowProps) => {
  const handleRemoveUnit = () => {
    onRemoveUnit(unit.id);
  };
  const handleRemoveStrategy = (strategyId: string) => {
    onRemoveStrategy(unit.id, strategyId);
  };
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
      <DeleteButton handleOnClick={handleRemoveUnit} />
      <Grid size={{ xs: 3 }}>
        <TextField
          fullWidth
          label={translationMap.actionUnits.action}
          variant="filled"
          value={unit.action}
          onChange={(e) => onActionChange(unit.id, e.target.value)}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Grid container spacing={2} alignItems="baseline">
          <Typography variant="body2" sx={{ mb: 1 }}>
            {translationMap.actionUnits.strategies}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onAddStrategy(unit.id)}
            sx={{ mt: 1 }}
          >
            <Add />
          </Button>
        </Grid>

        {unit.strategies.map((strategy, index) => (
          <Grid container spacing={2} alignItems="center" key={strategy.id}>
            <Grid size={{ xs: 8 }}>
              <TextField
                fullWidth
                label={`${translationMap.actionUnits.strategy} ${index + 1}`}
                variant="filled"
                value={strategy.text}
                onChange={(e) =>
                  onStrategyChange(unit.id, strategy.id, e.target.value)
                }
              />
            </Grid>
            <DeleteButton
              handleOnClick={() => handleRemoveStrategy(strategy.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
