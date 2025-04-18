import { PageHeader } from "../components/PageHeader";
import SettingsIcon from '@mui/icons-material/Settings';


export const Settings = () => {
  return (
    <div className="page">
      <PageHeader
        icon={<SettingsIcon />}
        title="Axustes"
      />

      <div className="radio-buttons">
        <label>
          <input type="radio" name="language" value="es_gl" />Galego
        </label>

      </div>


      <p>Esta páxina está en construción.</p>

    </div>
  );
};
