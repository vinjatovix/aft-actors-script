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
  if (loading) {
    return <div>Cargando escenas...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <>
      <img src="/assets/scene.svg" alt="Icono dun cubo simulando unha caixa escénica" width="50" height="50" />
      <h1>Scenes</h1>
      {scenes.length === 0 ? (
        <p>No hay escenas disponibles</p>
      ) : (
        scenes.map((scene: Scene) => (
          <SceneCard
            key={scene.id}
            {...scene}
          />

        ))
      )}
    </>
  );
};
