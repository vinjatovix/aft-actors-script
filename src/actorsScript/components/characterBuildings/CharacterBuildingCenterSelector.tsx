import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CharacterBuildingCenterSelector = ({
  formData,
  setFormData
}: {
  formData: { center: string };
  setFormData: React.Dispatch<React.SetStateAction<{ center: string }>>;
}) => {
  const { t } = useTranslation('characterBuilding');

  return (
    <FormControl fullWidth>
      <InputLabel id="center-label">{t('center.label')}</InputLabel>
      <Select
        labelId="center-label"
        variant="filled"
        value={formData.center}
        onChange={(e) => {
          const selectedCenter = e.target.value;
          setFormData({ ...formData, center: selectedCenter });
        }}
        name="center"
      >
        <MenuItem value="instinctive">{t('center.instinctive')}</MenuItem>
        <MenuItem value="mental">{t('center.mental')}</MenuItem>
        <MenuItem value="emotional">{t('center.emotional')}</MenuItem>
      </Select>
    </FormControl>
  );
};
