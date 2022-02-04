import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { PrometheusModule } from 'src/prometheus/prometheus.module';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  imports: [PrometheusModule, MetricsModule],
  providers: [DatasService],
  controllers: [DatasController]
})
export class DatasModule {}
