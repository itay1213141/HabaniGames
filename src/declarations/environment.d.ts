declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STORAGE_URL: string;
      STORAGE_PORT: string;
      STORAGE_TLS: string;
    }
  }
}
