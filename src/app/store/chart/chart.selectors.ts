// src/app/store/chart/chart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChartState, selectAll as selectAllCharts } from './chart.reducer';

export const selectChartState = createFeatureSelector<ChartState>('charts');

export const selectAll = createSelector(selectChartState, selectAllCharts);

export const selectEntities = createSelector(
  selectChartState,
  (state: ChartState) => state.entities
);

export const selectDateRange = createSelector(
  selectChartState,
  (state: ChartState) => state.dateRange
);

export const selectChartsWithinDateRange = createSelector(
  selectAll,
  selectDateRange,
  (charts, dateRange) => {
    if (!dateRange) {
      return charts;
    }
    const { startDate, endDate } = dateRange;
    return charts.filter(
      (chart) =>
        new Date(chart.startDate) >= new Date(startDate) &&
        new Date(chart.endDate) <= new Date(endDate)
    );
  }
);
