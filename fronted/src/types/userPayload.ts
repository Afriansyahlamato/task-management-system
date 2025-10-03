export type UserPayload = {
  sub: string;
  name: string;
  role: "admin" | "user";
  exp: number;
};