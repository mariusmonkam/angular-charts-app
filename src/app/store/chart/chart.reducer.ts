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

const initialCharts: Chart[] = [
  {
    id: '1',
    name: 'Chart 1',
    type: 'line',
    data: [1, 2, 3],
    labels: ['A', 'B', 'C'],
    color: '#ff0000',
    startDate: '2023-01-01',
    endDate: '2023-01-03',
  },
  {
    id: '2',
    name: 'Chart 2',
    type: 'spline',
    data: [4, 5, 6],
    labels: ['D', 'E', 'F'],
    color: '#00ff00',
    startDate: '2023-02-01',
    endDate: '2023-02-03',
  },
  {
    id: '3',
    name: 'Chart 3',
    type: 'area',
    data: [7, 8, 9],
    labels: ['G', 'H', 'I'],
    color: '#0000ff',
    startDate: '2023-03-01',
    endDate: '2023-03-03',
  },
  {
    id: '4',
    name: 'Chart 4',
    type: 'line',
    data: [10, 11, 12],
    labels: ['J', 'K', 'L'],
    color: '#ffff00',
    startDate: '2023-04-01',
    endDate: '2023-04-03',
  },
  {
    id: '5',
    name: 'Chart 5',
    type: 'spline',
    data: [13, 14, 15],
    labels: ['M', 'N', 'O'],
    color: '#ff00ff',
    startDate: '2023-05-01',
    endDate: '2023-05-03',
  },
  {
    id: '6',
    name: 'Chart 6',
    type: 'area',
    data: [16, 17, 18],
    labels: ['P', 'Q', 'R'],
    color: '#00ffff',
    startDate: '2023-06-01',
    endDate: '2023-06-03',
  },
];

export const initialState: ChartState = adapter.getInitialState({
  error: null,
  dateRange: null,
  loading: false,
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
  on(ChartActions.updateDateRange, (state, { startDate, endDate }) => ({
    ...state,
    dateRange: { startDate, endDate },
  })),
  on(ChartActions.loadCharts, (state) => {
    const chartDataString = localStorage.getItem('charts');
    let newState = { ...state };

    if (chartDataString) {
      try {
        const chartData: { [key: string]: Chart } = JSON.parse(chartDataString);
        console.log('Loaded chart data from local storage:', chartData);
        newState = adapter.setAll(Object.values(chartData), {
          ...newState,
          error: null,
        });
      } catch (error) {
        console.error('Error parsing chart data from local storage:', error);
        newState = { ...newState, error: 'Failed to parse chart data' };
      }
    } else {
      console.warn('No chart data found in local storage');
      newState = { ...newState, error: 'No chart data in local storage' };
    }

    // Ensure that initial charts are added if no data is available in local storage
    if (adapter.getSelectors().selectAll(newState).length === 0) {
      newState = adapter.setAll(initialCharts, newState);
    }

    return newState;
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
