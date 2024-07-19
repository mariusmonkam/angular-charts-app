// src/app/store/chart/chart.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
import { SQLiteChartService } from '../../services/sqlite3.service';
import { Chart } from './chart.model';

@Injectable()
export class ChartEffects {
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
      switchMap(() =>
        this.chartService.getCharts().then(
          (charts) => ChartActions.loadChartsSuccess({ charts }),
          (error) => ChartActions.loadChartsFailed()
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
          (error) => ChartActions.loadChartsFailed()
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
          (error) => ChartActions.loadChartsFailed()
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
          (error) => ChartActions.loadChartsFailed()
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private chartService: SQLiteChartService
  ) {}
}
