import winston from 'winston';
import { ecsFormat } from '@elastic/ecs-winston-format';
import { Client } from '@elastic/elasticsearch';
import TransportStream from 'winston-transport';

// Configuración del cliente de Elasticsearch
const esClient = new Client({ node: 'http://localhost:9200' });

class ElasticsearchTransport extends TransportStream {
  constructor(opts: TransportStream.TransportStreamOptions) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    try {
      // Enviar el log a Elasticsearch
      await esClient.index({
        index: 'logs-microservice',
        body: info,
      });

      console.log('Log enviado a Elasticsearch:', info);
    } catch (error) {
      console.error('Error enviando log a Elasticsearch:', error);
    }

    // Asegurarse de que Winston procese el siguiente log
    callback();
  }
}

// Configuración del logger
export const logger = winston.createLogger({
  level: 'info',
  format: ecsFormat(), // Usa el formato ECS para Elastic
  transports: [
    new winston.transports.Console(), // Logs en consola
    new ElasticsearchTransport({}), // Transporte personalizado para Elasticsearch
  ],
});