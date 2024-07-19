export interface Chart {
  id: string;
  name: string;
  type: string;
  color?: string;
  data: number[];
  labels: string[];
  options?: any;
}
