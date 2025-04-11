export interface AuthDTO {
  email: string;
  username?: string;
  password: string;
}

export interface RefreshDTO {
  refreshToken: string;
}
