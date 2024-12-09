import { Request, Response } from 'express';
import { logger } from '../config/logger';

export class TransactionController {
  static success(req: Request, res: Response) {
    logger.info({ message: 'Transacción exitosa', status: 200 });
    res.status(200).send({ message: 'Success!' });
  }

  static error(req: Request, res: Response) {
    logger.error({ message: 'Transacción fallida', status: 500 });
    res.status(500).send({ message: 'Error!' });
  }
}
