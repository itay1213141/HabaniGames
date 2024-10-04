import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  _Object as S3Object,
} from "@aws-sdk/client-s3";
import config from "./config";

const { storage } = config;

const client = new S3Client({
  region: "us-east-1",
  endpoint: storage.endpoint,
  tls: storage.tls,
  credentials: {
    accessKeyId: storage.auth.accessKey,
    secretAccessKey: storage.auth.secretKey,
  },
});

export const getFiles = async (bucket: string): Promise<S3Object[]> => {
  const results: ListObjectsV2CommandOutput = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
    })
  );

  return results.Contents ?? [];
};

export default client;
