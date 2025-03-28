import { useEffect, useState } from "react";
import { API_URL, APP_VERSION } from "../../constants";

const HEALTH_ENDPOINT = `${API_URL}/api/v1/health/http`;
const AFT_IG = "https://www.instagram.com/adestramentoactoralft/";

export const Home = () => {
  const [backendVersion, setBackendVersion] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchBackendVersion = async () => {
      try {
        const response = await fetch(HEALTH_ENDPOINT);

        if (!response.ok) {
          throw new Error("Connection error");
        }

        const { version } = await response.json();
        setBackendVersion(version);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    };

    fetchBackendVersion();
  }, []);

  return (
    <div className="actors-script-app">
      <img src="/favicon.png" alt="Actors Script Logo" />
      <h1>Actors Script</h1>
      <a href={AFT_IG} target="_blank" rel="noreferrer">
        Powered by AFT & Studio K
      </a>
      {errorMessage && <p>{errorMessage}</p>}
      <footer>
        Frontend: {APP_VERSION} Backend: {backendVersion}
      </footer>
    </div>
  );
};
