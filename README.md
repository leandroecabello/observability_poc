# Observabilidad POC: Monitoreo de Logs y Métricas

Este proyecto es una Prueba de Concepto (POC) para implementar observabilidad en un microservicio utilizando **Elastic Stack (Elasticsearch + Kibana)** y **Prometheus + Grafana**. Incluye monitoreo de logs, métricas de rendimiento, y visualización de datos en tiempo real.

## **Tecnologías Utilizadas**

1. **Microservicio**:
   - Node.js v20 con TypeScript.
   - Librerías principales: `winston` (para logs), `@elastic/ecs-winston-format` (para estructurar logs), `prom-client` (para métricas).

2. **Elasticsearch y Kibana**:
   - Elasticsearch para almacenar logs.
   - Kibana para visualizar y analizar los logs.

3. **Prometheus y Grafana**:
   - Prometheus para recolectar métricas.
   - Grafana para visualización y alertas de métricas en tiempo real.

---

## **Estructura del Proyecto**

``` bash
observability-poc/ 
├── src/
│   ├── config/ # Configuración de Winston para logs
│   │   ├── logger.ts # Configuración de Winston para logs estructurados 
│   │   ├── metrics.ts # Configuración de métricas con prom-client
│   ├── controllers/    # Controladores
│   │   ├── TransactionController.ts
│   │   ├── MetricsController.ts
│   ├── routes/         # Rutas 
│   │   ├── index.ts
│   ├── app.ts # Servidor principal Express 
├── docker-compose.yml # Configuración de contenedores para Elasticsearch, Kibana, Prometheus y Grafana 
├── prometheus.yml # Configuración de Prometheus para recolectar métricas 
├── README.md # Documentación del proyecto 
├── package.json
├── tsconfig.json
```

# Dependencias del proyecto

## **Requisitos Previos**

- **Docker y Docker Compose** instalados en tu máquina.
- **Node.js v20** instalado para ejecutar el microservicio.

---

## **Instalación y Ejecución**

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/leandroecabello/observability_poc.git
cd observability_poc
```
### **2. Instalar Dependencias**
```bash
npm install
```
### **3. Ejecutar el Proyecto**
#### **Localmente**
```bash
npm run dev
```
#### **Con Docker Compose**
Inicia los contenedores para Elasticsearch, Kibana, Prometheus y Grafana:

```bash
docker-compose up -d
```
### **4. Acceso a las Herramientas**
- Kibana (Logs): http://localhost:5601
- Prometheus (Métricas): http://localhost:9090
- Grafana (Visualización): http://localhost:3001

### **Endpoints del Microservicio**
| **Método** | **Ruta**    | **Descripción**                                  |
|------------|-------------|--------------------------------------------------|
| GET        | `/success`  | Endpoint que simula una transacción exitosa.     |
| GET        | `/error`    | Endpoint que simula una transacción fallida.     |
| GET        | `/metrics`  | Exposición de métricas para Prometheus.          |

## **Configuraciones Importantes**
**1. Logs**

Los logs del microservicio se envían a Elasticsearch utilizando winston. El formato sigue la especificación ECS (Elastic Common Schema).

```json
{
  "@timestamp": "2024-12-08T22:58:29.221Z",
  "ecs.version": "8.10.0",
  "log.level": "info",
  "message": "Transacción exitosa",
  "status": 200
}
```

**2. Métricas**

Las métricas se exponen en el endpoint `/metrics` y son recolectadas por Prometheus. Ejemplos:

- `http_request_duration_seconds_bucket`: Duración de solicitudes HTTP.
- `http_request_duration_seconds_count`: Conteo total de solicitudes.
- `process_resident_memory_bytes`: Uso de memoria del proceso.

## **Dashboards y Visualizaciones**

### **1. Elastic + Kibana**

#### **Visualización de Logs**
- Visualización de logs estructurados en tiempo real en la sección **Discover**.
- Ejemplo:
  ![Logs en Discover](images\discover_section.png)

#### **Dashboards Personalizados**
- Dashboards creados con:
  - Gráficos de estados de respuesta (200, 500).
  - Errores agrupados por mensaje o nivel de log (`log.level`).
- Ejemplo:
  ![Dashboard en Kibana](images\graphic.png)

### **2. Prometheus + Grafana**

#### **Gráficos en Tiempo Real**
- Métricas visualizadas:
  - **Tiempo promedio de respuesta (P95):** Muestra la latencia en percentil 95.
  - **Total de solicitudes HTTP por segundo.**
  - **Uso de CPU y memoria.**
- Ejemplo:
  ![Dashboard en Grafana](images\my_graphana_dashboard.png)

#### **Alertas Configurables**
- Alertas configuradas para:
  - Tiempo de respuesta superior a 1s.
  - Picos en el uso de memoria.

## **Autenticación para Prometheus con Nginx**

### **Generar un archivo .htpasswd**
Si tienes `htpasswd` instalado, ejecuta el siguiente comando:

```bash
htpasswd -nb admin mypassword > htpasswd
```

Esto generará un archivo `htpasswd` con el usuario `admin` y la contraseña `mypassword`.

Si no tienes `htpasswd`, utiliza un generador online como [htpasswd Generator](https://www.htaccesstools.com/htpasswd-generator/).

### **Actualizar el archivo .env**
Incluye el contenido generado en la variable `HTPASSWD_CONTENT`:

```env
HTPASSWD_CONTENT=admin:$apr1$xyz$C6rfD9uhypz5e.1jWVjWO0
```

### **Reconstruir el servicio Nginx**
Ejecuta los siguientes comandos para reconstruir y levantar el servicio Nginx:

```bash
docker-compose build nginx
docker-compose up -d nginx
```

### **Probar el acceso protegido**
Accede a Prometheus a través de Nginx:

- **URL**: [http://localhost:8080](http://localhost:8080)
- **Usuario**: `admin`
- **Contraseña**: La que generaste


## **Siguientes Pasos**
1. Extender la POC para incluir más métricas (como la tasa de errores).
2. Implementar alertas en Grafana para notificaciones automáticas.
3. Optimizar la ingesta de logs con Index Templates en Elasticsearch.

## **Créditos**
- Autor: Leandro Cabello
- Fecha: Diciembre 2024