import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ChartActions from './chart.actions';
import { Chart } from './chart.model';

export interface ChartState extends EntityState<Chart> {
  error: string | null;
  dateRange: { startDate: string; endDate: string } | null;
  loading: boolean;
}

export const adapter: EntityAdapter<Chart> = createEntityAdapter<Chart>();

export const initialState: ChartState = adapter.getInitialState({
  error: null,
  dateRange: null,
  loading: false,
});

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.loadCharts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ChartActions.loadChartsSuccess, (state, { charts }) =>
    adapter.setAll(charts, { ...state, error: null, loading: false })
  ),
  on(ChartActions.loadChartsFailed, (state) => ({
    ...state,
    error: 'Error loading charts',
    loading: false,
  })),
  on(ChartActions.addChart, (state, { chart }) =>
    adapter.addOne(chart, { ...state, error: null })
  ),
  on(ChartActions.updateChart, (state, { chart }) =>
    adapter.updateOne(
      { id: chart.id, changes: chart },
      { ...state, error: null }
    )
  ),
  on(ChartActions.deleteChart, (state, { id }) =>
    adapter.removeOne(id, { ...state, error: null })
  ),
  on(ChartActions.updateDateRange, (state, { startDate, endDate }) => ({
    ...state,
    dateRange: { startDate, endDate },
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
