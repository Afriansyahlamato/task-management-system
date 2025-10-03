export type UserPayload = {
  sub: string;
  name: string;
  role: "admin" | "user";
  exp: number;
};

export function parseJwt(token: string): UserPayload | null {
  console.log(token)
  try {
    const [, payload] = token.split(".");
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as UserPayload;
  } catch {
    return null;
  }
}
