import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  IconButton,
  Button,
  TextField
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteButton } from '../../buttons/DeleteButton';

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

const extractStrategyTexts = (unit: ActionUnit): string[] => {
  return unit.strategies.map((strategy) => strategy.text);
};

export const ActionUnits = ({ formData, setFormData }: ActionUnitsProps) => {
  const { t } = useTranslation('characterBuilding');

  const [actionUnits, setActionUnits] = useState<ActionUnit[]>(
    formData?.actionUnits.map((unit) => ({
      id: uuidv4(),
      action: unit.action,
      strategies: unit.strategies.map((strategy) => ({
        id: uuidv4(),
        text: strategy
      }))
    }))
  );

  const updateFormData = (updatedUnits: ActionUnit[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      actionUnits: updatedUnits.map((unit) => ({
        action: unit.action,
        strategies: extractStrategyTexts(unit)
      }))
    }));
  };

  const updateActionUnits = (updatedUnits: ActionUnit[]) => {
    setActionUnits(updatedUnits);
    updateFormData(updatedUnits);
  };

  const handleAddActionUnit = () => {
    updateActionUnits([
      ...actionUnits,
      { id: uuidv4(), action: '', strategies: [] }
    ]);
  };

  const handleRemoveActionUnit = (id: string) => {
    updateActionUnits(actionUnits.filter((unit) => unit.id !== id));
  };

  const handleActionUnitChange = (unitId: string, value: string) => {
    updateActionUnits(
      actionUnits.map((unit) =>
        unit.id === unitId ? { ...unit, action: value } : unit
      )
    );
  };

  const handleAddStrategy = (unitId: string) => {
    updateActionUnits(
      actionUnits.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              strategies: [...unit.strategies, { id: uuidv4(), text: '' }]
            }
          : unit
      )
    );
  };

  const handleStrategyChange = (
    unitId: string,
    strategyId: string,
    value: string
  ) => {
    updateActionUnits(
      actionUnits.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              strategies: unit.strategies.map((strategy) =>
                strategy.id === strategyId
                  ? { ...strategy, text: value }
                  : strategy
              )
            }
          : unit
      )
    );
  };

  const handleRemoveStrategy = (unitId: string, strategyId: string) => {
    updateActionUnits(
      actionUnits.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              strategies: unit.strategies.filter(
                (strategy) => strategy.id !== strategyId
              )
            }
          : unit
      )
    );
  };

  return (
    <Grid container spacing={2} size={{ xs: 12, md: 6 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          {t('actionUnits.label')}
        </Typography>
      </Grid>

      {actionUnits.length === 0 && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t('actionUnits.empty')}
        </Typography>
      )}

      {actionUnits.map((unit) => (
        <Grid size={{ xs: 12 }} key={unit.id}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">
                {unit.action || t('actionUnits.new')}
              </Typography>
            </AccordionSummary>

            <AccordionDetails
              sx={{ backgroundColor: 'background.paper', p: 2 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 10 }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label={t('actionUnits.action')}
                    value={unit.action}
                    onChange={(e) =>
                      handleActionUnitChange(unit.id, e.target.value)
                    }
                  />
                </Grid>

                <Grid size={{ xs: 2 }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveActionUnit(unit.id)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                {t('actionUnits.strategies')}
              </Typography>

              {unit.strategies.map((strategy, index) => (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  key={strategy.id}
                >
                  <Grid size={{ xs: 10 }}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label={`${t('actionUnits.strategy')} ${index + 1}`}
                      value={strategy.text}
                      onChange={(e) =>
                        handleStrategyChange(
                          unit.id,
                          strategy.id,
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid
                    size={{ xs: 2 }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <DeleteButton
                      handleOnClick={() =>
                        handleRemoveStrategy(unit.id, strategy.id)
                      }
                      testid="delete-strategy"
                    />
                  </Grid>
                </Grid>
              ))}

              <Button
                startIcon={<Add />}
                variant="text"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => handleAddStrategy(unit.id)}
              >
                {t('add')}
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
      <Button
        startIcon={<Add />}
        variant="outlined"
        color="primary"
        onClick={handleAddActionUnit}
      >
        {t('add')}
      </Button>
    </Grid>
  );
};
