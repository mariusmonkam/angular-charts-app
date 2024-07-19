// src/app/store/chart/chart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
import { SQLiteChartService } from '../../services/sqlite3.service';

@Injectable()
export class ChartEffects {
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
      switchMap(() =>
        this.chartService.getCharts().then(
          (charts) => ChartActions.loadChartsSuccess({ charts }),
          () => ChartActions.loadChartsFailed()
        )
      )
    )
  );

  addChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.addChart),
      mergeMap((action) =>
        this.chartService.addChart(action.chart).then(
          () => ChartActions.loadCharts(), // Reload charts after adding
          () => ChartActions.loadChartsFailed()
        )
      )
    )
  );

  updateChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.updateChart),
      mergeMap((action) =>
        this.chartService.updateChart(action.chart).then(
          () => ChartActions.loadCharts(), // Reload charts after updating
          () => ChartActions.loadChartsFailed()
        )
      )
    )
  );

  deleteChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.deleteChart),
      mergeMap((action) =>
        this.chartService.deleteChart(action.id).then(
          () => ChartActions.loadCharts(), // Reload charts after deleting
          () => ChartActions.loadChartsFailed()
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private chartService: SQLiteChartService
  ) {}
}
