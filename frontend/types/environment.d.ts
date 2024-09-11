export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      BACKEND_URL: string;
    }
  }
}
