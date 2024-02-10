export interface JwtPayload {
  email: string;
  sub: number;
  // I just realized we don't have roles yet lol
  // role?: string;
}
