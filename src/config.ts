import yn from "yn";
import z from "zod";

const configSchema = z.object({
  storage: z.object({
    url: z.string(),
    port: z.number(),
    tls: z.boolean(),
    auth: z.object({
      accessKey: z.string(),
      secretKey: z.string(),
    }),
    gamesBucket: z.string(),
  }),
});

const config: z.infer<typeof configSchema> = {
  storage: {
    url: import.meta.env.STORAGE_URL!,
    port: import.meta.env.STORAGE_PORT
      ? parseInt(import.meta.env.STORAGE_PORT)
      : 80,
    tls: yn(import.meta.env.STORAGE_TLS, { default: false }),
    auth: {
      accessKey: import.meta.env.STORAGE_ACCESS_KEY!,
      secretKey: import.meta.env.STORAGE_SECRET_KEY!,
    },
    gamesBucket: import.meta.env.GAMES_BUCKET || "games",
  },
};

export default config;
