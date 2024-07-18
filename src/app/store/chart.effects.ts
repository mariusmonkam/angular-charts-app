import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ChartActions from './chart.actions';
// Import your chart service here

@Injectable()
export class ChartEffects {
  loadCharts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChartActions.loadCharts),
      mergeMap(() =>
        // Replace this with your actual API call
        of([
          /* sample chart data */
        ]).pipe(
          map((charts) => ChartActions.loadChartsSuccess({ charts })),
          catchError(() => of({ type: '[Chart] Load Charts Error' }))
        )
      )
    )
  );

  constructor(private actions$: Actions) // Inject your chart service here
  {}
}
