import { _Object as S3Object } from "@aws-sdk/client-s3";
import config from "./config";
import { getFiles } from "./storage";
import { Game } from "./types/game";

const { storage } = config;

export const getGames = async (): Promise<Game[]> => {
  const gameFiles: S3Object[] = await getFiles(storage.gamesBucket);

  return gameFiles.map((gameFile: S3Object) => ({
    name: gameFile.Key!,
    size: gameFile.Size!,
  }));
};
