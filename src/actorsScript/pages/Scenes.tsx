import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllScenes } from "../../redux/thunks/sceneThunks";
import { Scene } from "../../redux/interfaces/sceneInterfaces";
import { SceneCard } from "../components/scenes/SceneCard";

export const Scenes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { scenes, loading, error } = useSelector((state: RootState) => state.scene);

  useEffect(() => {
    dispatch(getAllScenes());
  }, [dispatch]);



  return (
    <div className="page">
      <img src="/assets/scene.svg" alt="Icono dun cubo simulando unha caixa escénica" width="50" height="50" />
      <h1>Scenes</h1>

      {loading && <p>Cargando escenas...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !scenes.length && (
        <p>No hay escenas disponibles</p>
      )}

      {!loading && !!scenes.length && (
        <div className="card-container">
          {scenes.map((scene: Scene) => (
            <SceneCard
              key={scene.id}
              {...scene}
            />

          ))}
        </div>
      )}
    </div>
  );
};
