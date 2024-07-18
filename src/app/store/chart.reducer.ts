import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ChartActions from './chart.actions';
import { Chart } from './chart.model';

export interface State extends EntityState<Chart> {}

export const adapter: EntityAdapter<Chart> = createEntityAdapter<Chart>();

export const initialState: State = adapter.getInitialState();

export const chartReducer = createReducer(
  initialState,
  on(ChartActions.loadChartsSuccess, (state, { charts }) =>
    adapter.setAll(charts, state)
  ),
  on(ChartActions.addChart, (state, { chart }) => adapter.addOne(chart, state)),
  on(ChartActions.updateChart, (state, { chart }) =>
    adapter.updateOne({ id: chart.id, changes: chart }, state)
  ),
  on(ChartActions.deleteChart, (state, { id }) => adapter.removeOne(id, state))
  //selectIds
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
