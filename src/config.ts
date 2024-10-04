import yn from "yn";
import z from "zod";

const configSchema = z.object({
  storage: z.object({
    endpoint: z.string(),
    tls: z.boolean(),
    auth: z.object({
      accessKey: z.string(),
      secretKey: z.string(),
    }),
    gamesBucket: z.string(),
  }),
});

const {
  STORAGE_ENDPOINT,
  STORAGE_TLS,
  STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY,
  STORAGE_GAMES_BUCKET,
} = import.meta.env;

const config: z.infer<typeof configSchema> = {
  storage: {
    endpoint: STORAGE_ENDPOINT,
    tls: yn(STORAGE_TLS, { default: false }),
    auth: {
      accessKey: STORAGE_ACCESS_KEY,
      secretKey: STORAGE_SECRET_KEY,
    },
    gamesBucket: STORAGE_GAMES_BUCKET || "games",
  },
};

export default config;
