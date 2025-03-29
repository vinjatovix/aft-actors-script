import { Routes, Route } from "react-router-dom";
import { Authors } from "../pages/Authors";
import { Books } from "../pages/Books";
import { CharacterBuildings } from "../pages/CharacterBuildings";
import { Characters } from "../pages/Characters";
import { Home } from "../pages/Home";
import { Scenes } from "../pages/Scenes";
import { Settings } from "../pages/Settings";

export const ActorsScriptRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="authors" element={<Authors />} />
      <Route path="plays" element={<Books />} />
      <Route path="characters" element={<Characters />} />
      <Route path="scenes" element={<Scenes />} />
      <Route path="character-buildings" element={<CharacterBuildings />} />
      <Route path="settings" element={<Settings />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
};
