export interface User {
  username: string | null;
  id: string | null;
  roles: string[];
  email: string | null;
}
export interface LoginPayload extends Record<string, string> {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: User;
}
export interface RegisterPayload {
  id: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface AuthState {
  token: string | null;
  user: User;
  loading: boolean;
  error: string | null;
}
