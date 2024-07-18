export interface Chart {
  id: string;
  name: string;
  type: string;
  color: string;
  data: { date: string; value: number }[];
}
