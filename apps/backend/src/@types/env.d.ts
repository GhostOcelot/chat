declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    NAME: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    PORT: number;
  }
}
