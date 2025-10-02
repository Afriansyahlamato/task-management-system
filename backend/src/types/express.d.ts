import 'express';
import type { UserTokenPayload } from './token';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserTokenPayload;
  }
}
