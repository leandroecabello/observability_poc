import { Router } from 'express';
import { MetricsController } from '../controllers/MetricsController';
import { TransactionController } from '../controllers/TransactionController';

const routes = Router();

routes.get('/metrics', MetricsController.getMetrics);
routes.get('/success', TransactionController.success);
routes.get('/error', TransactionController.error);

export default routes;