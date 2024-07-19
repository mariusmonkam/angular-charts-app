import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChartState } from './chart.reducer';
import * as fromChart from './chart.reducer';

export const selectChartState = createFeatureSelector<ChartState>('charts'); // Note: it's 'charts', not 'chart'

export const selectAllCharts = createSelector(
  selectChartState,
  fromChart.selectAll
);

export const selectChartEntities = createSelector(
  selectChartState,
  fromChart.selectEntities
);

export const selectTotalCharts = createSelector(
  selectChartState,
  fromChart.selectTotal
);
