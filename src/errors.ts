export class GameAlreadyRunningError extends Error {
  constructor(game: string) {
    super(`Game ${game} is already running!`);
  }
}
