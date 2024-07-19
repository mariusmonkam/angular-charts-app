// src/app/store/chart/chart.model.ts

// src/app/store/chart/chart.model.ts
export interface Chart {
  id: string;
  name: string;
  type: string;
  data: number[];
  labels: string[];
  color: string;
  startDate: string; // Add startDate
  endDate: string; // Add endDate
}
