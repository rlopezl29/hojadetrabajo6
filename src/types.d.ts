import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      usuario?: { DPI: string; nombre: string };
    }
  }
}
