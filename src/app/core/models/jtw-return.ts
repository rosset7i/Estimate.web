import { JwtPayload } from "jwt-decode";

export interface JwtReturn extends JwtPayload {
  email: string;
}
