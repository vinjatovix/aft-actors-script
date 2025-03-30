import { PageHeader } from "../components/PageHeader";
import SettingsIcon from '@mui/icons-material/Settings';


export const Settings = () => {
  return (
    <div className="page">
      <PageHeader
        icon={<SettingsIcon />}
        title="Axustes"
      />
    </div>
  );
};
