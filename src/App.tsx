import { WebviewWindow } from "@tauri-apps/api/window";
import "./App.css";
import { useEffect, useState } from "react";
import { GameAlreadyRunningError } from "./errors";
import prettyBytes from "pretty-bytes";
import { Game } from "./types/game";
import { getGames } from "./games";
import { capitalCase, snakeCase } from "change-case";
import { getPreference } from "./preferences";

const downloadGame = (gameFileName: string) => {
  throw new Error();
};

const getGameURL = (gameFileName: string): string => {
  const gamesPath: string = getPreference("gamesPath");
  const isGameDownloaded: boolean = ((gameFileName: string): boolean => true)(
    gameFileName
  );
  if (!isGameDownloaded) {
    downloadGame(gameFileName);
  }

  return `${gamesPath}/${gameFileName}`;
};

const openGame = (game: Game) => {
  const [nameWithoutFileExtention] = game.name.split(".");
  const gameLabel = snakeCase(nameWithoutFileExtention);
  const formattedName = capitalCase(nameWithoutFileExtention);

  if (WebviewWindow.getByLabel(gameLabel)) {
    throw new GameAlreadyRunningError(formattedName);
  }

  const gameWindow: WebviewWindow = new WebviewWindow(gameLabel, {
    url: getGameURL(game.name),
    title: formattedName,
  });

  gameWindow.once("tauri://created", (details) => {
    console.log(details);
  });

  gameWindow.once("tauri://error", (details) => {
    console.error(details);
  });
};

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>();

  useEffect(() => {
    getGames()
      .then((games) => setGames(games))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <ul>
        {games.length ? (
          games.map((game) => {
            const [noExtention] = game.name.split(".");
            const formattedName: string = `${capitalCase(
              noExtention
            )} (${prettyBytes(game.size)})`;

            return (
              <li key={game.name} onClick={() => setSelectedGame(game)}>
                <span>{formattedName}</span>
              </li>
            );
          })
        ) : (
          <span>no games</span>
        )}
      </ul>
      {selectedGame && (
        <button
          className="open-game-btn"
          onClick={() => openGame(selectedGame)}
        >
          Play {selectedGame.name}
        </button>
      )}
    </>
  );
};

export default App;
