/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STORAGE_ENDPOINT: string;
  readonly STORAGE_TLS: string;
  readonly STORAGE_ACCESS_KEY: string;
  readonly STORAGE_SECRET_KEY: string;
  readonly STORAGE_GAMES_BUCKET: string;
}
