import { WebviewWindow } from "@tauri-apps/api/window";
import "./App.css";
import { useEffect, useState } from "react";
import { GameAlreadyRunningError } from "./errors";
import prettyBytes from "pretty-bytes";
import { Game } from "./types/game";
import { getGames } from "./games";
import { capitalCase } from "change-case";

const openGame = (game: Game) => {
  const { name } = game;

  if (WebviewWindow.getByLabel(name)) {
    throw new GameAlreadyRunningError(name);
  }

  const gameWindow: WebviewWindow = new WebviewWindow(name, {
    url: "C:/test.html",
    title: game.name,
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
