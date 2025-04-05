import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CharacterBuildingCenterSelector = ({
  formData,
  setFormData,
  translationMap,
}: {
  formData: { center: string };
  setFormData: React.Dispatch<React.SetStateAction<{ center: string }>>;
  translationMap: {
    label: string;
    instinctive: string;
    mental: string;
    emotional: string;
  };
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="center-label">{translationMap.label}</InputLabel>
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
        <MenuItem value="instinctive">{translationMap.instinctive}</MenuItem>
        <MenuItem value="mental">{translationMap.mental}</MenuItem>
        <MenuItem value="emotional">{translationMap.emotional}</MenuItem>
      </Select>
    </FormControl>
  );
};
