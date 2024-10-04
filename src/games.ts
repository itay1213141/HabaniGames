import { BucketItemWithMetadata } from "minio";
import config from "./config";
import { getFiles } from "./storage";
import { Game } from "./types/game";

const { storage } = config;

export const getGames = async (): Promise<Game[]> => {
  const gameFiles: BucketItemWithMetadata[] = await getFiles(
    storage.gamesBucket
  );

  return gameFiles.map((gameFile) => ({
    name: gameFile.name!,
    size: gameFile.size,
  }));
};
