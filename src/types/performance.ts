
export interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}

export interface PerformanceMonitoringConfig {
  enableLongTaskMonitoring?: boolean;
  enableResourceMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  memoryThreshold?: number;
  resourceThreshold?: number;
}

export interface ResourceHint {
  rel: string;
  href: string;
  crossorigin?: boolean | string;
}
