import { UserPayload } from "@models/UserPayload";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
