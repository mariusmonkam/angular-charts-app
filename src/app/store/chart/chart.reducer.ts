import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ChartActions from './chart.actions';
import { Chart } from './chart.model';

export interface ChartState extends EntityState<Chart> {
  error: string | null;
}

export const adapter: EntityAdapter<Chart> = createEntityAdapter<Chart>();

export const initialState: ChartState = adapter.getInitialState({
  error: null,
});

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.loadChartsSuccess, (state, { charts }) =>
    adapter.setAll(charts, { ...state, error: null })
  ),
  on(ChartActions.addChart, (state, { chart }) => adapter.addOne(chart, state)),
  on(ChartActions.updateChart, (state, { chart }) =>
    adapter.updateOne({ id: chart.id, changes: chart }, state)
  ),
  on(ChartActions.deleteChart, (state, { id }) => adapter.removeOne(id, state)),
  on(ChartActions.loadChartsFailed, (state) => ({
    ...state,
    error: 'Failed to load charts',
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
