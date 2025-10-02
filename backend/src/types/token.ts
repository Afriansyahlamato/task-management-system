export type UserTokenPayload = {
  sub: string;
  name: string;
  role: 'user' | 'admin';
  iat?: number;
  exp?: number;
};
