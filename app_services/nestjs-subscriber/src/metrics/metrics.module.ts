import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrometheusModule } from 'src/prometheus/prometheus.module';

@Module({
  imports: [ PrometheusModule ],
  providers: [ MetricsService ],
  controllers: [ MetricsController ]
})
export class MetricsModule {}
