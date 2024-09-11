export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      PORT: string;
      MONGODB_URI: string;
      DB_NAME: string;
      JWT_SECRET: string;
      CORS_ORIGIN: string;
    }
  }
}
