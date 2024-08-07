import { createAction, props } from '@ngrx/store';
import { Chart } from './chart.model';

// Existing actions
export const loadCharts = createAction('[Chart] Load Charts');
export const loadChartsSuccess = createAction(
  '[Chart] Load Charts Success',
  props<{ charts: Chart[] }>()
);
export const loadChartsFailed = createAction('[Chart] Load Charts Failed');
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
export const updateDateRange = createAction(
  '[Chart] Update Date Range',
  props<{ startDate: string | null; endDate: string | null }>()
);
export const applyDateFilter = createAction(
  '[Chart] Apply Date Filter',
  props<{ startDate: Date; endDate: Date }>()
);
export const clearCharts = createAction('[Chart] Clear Charts');
export const resetDateRange = createAction('[Chart] Reset Date Range');
