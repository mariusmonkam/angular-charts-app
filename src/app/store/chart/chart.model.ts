export interface Chart {
  id: string;
  name: string;
  type: string;
  color?: string; // Made optional as it's not used in our current setup
  data: number[]; // Changed to match the random data we're generating
  labels: string[]; // Added to store x-axis labels
  options?: any; // Made optional and kept for backwards compatibility
}
