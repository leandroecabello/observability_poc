import { collectDefaultMetrics, Histogram, Registry } from 'prom-client';

export class Metrics {
  private readonly registry: Registry;
  public httpRequestDuration: Histogram<string>;

  /**
   * Constructor de la clase Metrics
   *
   * Registra las métricas predeterminadas y crea una métrica de histograma
   * para medir la duración de las solicitudes HTTP
   */
  constructor() {
    this.registry = new Registry();
    collectDefaultMetrics({ register: this.registry });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duración de las solicitudes HTTP en segundos',
      labelNames: ['method', 'route', 'status_code'],
      registers: [this.registry],
    });
  }

  /**
   * Retrieves the current metrics from the registry.
   *
   * @returns A promise that resolves to a string containing the metrics in a format
   * that can be consumed by Prometheus.
   */
  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}


export const metrics = new Metrics();