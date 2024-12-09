import express from 'express';
import { metrics } from './config/metrics';
import routes from './routes';

const app = express();
const PORT = 3000;

// Middleware de métricas
app.use((req, res, next) => {
  const end = metrics.httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode.toString() });
  });
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});