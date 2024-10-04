import { BucketItemWithMetadata, Client } from "minio";
import config from "./config";

const { storage } = config;

const client = new Client({
  endPoint: storage.url,
  ...(storage.port && { port: storage.port }),
  useSSL: storage.tls,
  accessKey: storage.auth.accessKey,
  secretKey: storage.auth.secretKey,
});

export const getFiles = async (
  bucket: string
): Promise<BucketItemWithMetadata[]> => {
  const files: BucketItemWithMetadata[] = [];

  return new Promise((resolve, reject) => {
    client.extensions
      .listObjectsV2WithMetadata(bucket, "", true)
      .on("data", (file) => {
        files.push(file);
      })
      .on("end", () => resolve(files))
      .on("error", reject);
  });
};

export default client;
