import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Gauge, Histogram, Registry } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;

interface MapGauge {
  [key: string]: Gauge<string>;
}

@Injectable()
export class PrometheusService {
    private readonly serviceTitle = 'demo-client';
    private readonly servicePrefix = 'mqtt_';
    private registeredGauges: MapGauge = {};
    private readonly registry: Registry;
  
    public get metrics(): Promise<string> {
      return this.registry.metrics();
    }
  
    constructor() {
      this.registry = new Registry();
      this.registry.setDefaultLabels({
        app: this.serviceTitle,
      });
      collectDefaultMetrics({ register: this.registry, prefix: this.servicePrefix });
    }
  
    public registerGauge(name: string, help: string): Gauge<string> {
      if (this.registeredGauges[name] === undefined) {
        const gauge = (this.registeredGauges[name] = new Gauge({
          name: this.servicePrefix + name,
          help,
        }));
        this.registry.registerMetric(gauge);
        this.registeredGauges[name] = gauge;
      }
      return this.registeredGauges[name];
    }
}
