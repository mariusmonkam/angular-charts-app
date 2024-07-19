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
  })),
  // Custom action to load charts from local storage
  on(ChartActions.loadCharts, (state) => {
    const chartDataString = localStorage.getItem('charts');

    if (chartDataString) {
      try {
        const chartData: { [key: string]: Chart } = JSON.parse(chartDataString);
        console.log('Loaded chart data from local storage:', chartData);
        return adapter.setAll(Object.values(chartData), {
          ...state,
          error: null,
        });
      } catch (error) {
        console.error('Error parsing chart data from local storage:', error);
        // Handle parsing error (e.g., log the error and potentially dispatch a load charts failed action)
      }
    } else {
      console.warn('No chart data found in local storage');
      // Handle the case where no data exists in local storage (e.g., dispatch a load charts failed action)
    }

    return state; // Return original state if no changes were made
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
