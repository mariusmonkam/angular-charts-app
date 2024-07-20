import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
import { ChartService } from '../../services/data-storage.service';

@Injectable()
export class ChartEffects {
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
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
