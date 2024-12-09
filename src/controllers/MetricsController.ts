import { Request, Response } from 'express';
import { metrics } from '../config/metrics';

export class MetricsController {
  static async getMetrics(req: Request, res: Response) {
    res.set('Content-Type', 'text/plain');
    res.send(await metrics.getMetrics());
  }
}