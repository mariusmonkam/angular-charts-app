import { createAction, props } from '@ngrx/store';
import { Chart } from './chart.model';

export const loadCharts = createAction('[Chart] Load Charts');
export const loadChartsSuccess = createAction(
  '[Chart] Load Charts Success',
  props<{ charts: Chart[] }>()
);
export const addChart = createAction(
  '[Chart] Add Chart',
  props<{ chart: Chart }>()
);
export const updateChart = createAction(
  '[Chart] Update Chart',
  props<{ chart: Chart }>()
);
export const deleteChart = createAction(
  '[Chart] Delete Chart',
  props<{ id: string }>()
);
