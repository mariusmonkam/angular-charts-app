import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
import { ChartService } from '../../services/data-storage.service';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class ChartEffects {
  // Example with debounceTime to prevent too frequent API calls
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
      debounceTime(300), // Adjust debounce time as needed
      switchMap(() =>
        this.chartService.getAllCharts().pipe(
          map((charts) => ChartActions.loadChartsSuccess({ charts })),
          catchError(() => of(ChartActions.loadChartsFailed()))
        )
      )
    )
  );

  addChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.addChart),
      mergeMap((action) =>
        this.chartService.storeChart(action.chart).pipe(
          map(() => ChartActions.loadCharts()),
          catchError(() => of(ChartActions.loadChartsFailed()))
        )
      )
    )
  );

  updateChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.updateChart),
      mergeMap((action) =>
        this.chartService.updateChart(action.chart).pipe(
          map(() => ChartActions.loadCharts()),
          catchError(() => of(ChartActions.loadChartsFailed()))
        )
      )
    )
  );

  deleteChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.deleteChart),
      mergeMap((action) =>
        this.chartService.deleteChart(action.id).pipe(
          map(() => ChartActions.loadCharts()),
          catchError(() => of(ChartActions.loadChartsFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private chartService: ChartService) {}
}
