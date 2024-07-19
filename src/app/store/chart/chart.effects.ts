import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
import { Chart } from './chart.model';
import { exampleChartOptions } from './chart.options';

@Injectable()
export class ChartEffects {
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
      mergeMap(() =>
        // Replace this with your actual API call or mock data
        of([
          {
            id: '1',
            name: 'Chart 1',
            type: 'line',
            color: '#000',
            data: [],
            options: exampleChartOptions,
          },
          {
            id: '2',
            name: 'Chart 2',
            type: 'spline',
            color: '#FF0000',
            data: [],
            options: exampleChartOptions,
          },
        ]).pipe(
          map((charts) =>
            ChartActions.loadChartsSuccess({
              charts: charts as unknown as Chart[],
            })
          ),
          catchError((error) => of(ChartActions.loadChartsFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
