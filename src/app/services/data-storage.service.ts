import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Chart } from '../store/chart/chart.model';
import { environement } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  private databaseUrl = environement.firebaseConfig.databaseURL;

  storeChart(chart: Chart): Observable<string> {
    return this.http
      .post<{ id: string }>(`${this.databaseUrl}/charts.json`, chart)
      .pipe(
        map((response) => response.id),
        catchError((error) => {
          return throwError(() => new Error('Failed to store chart'));
        })
      );
  }

  getAllCharts(): Observable<Chart[]> {
    return this.http
      .get<{ [key: string]: Chart }>(`${this.databaseUrl}/charts.json`)
      .pipe(
        map((response) => {
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key,
          }));
        }),
        catchError((error) => {
          console.error('Error fetching charts:', error);
          return throwError(() => new Error('Failed to fetch charts'));
        })
      );
  }

  updateChart(chart: Chart): Observable<void> {
    return this.http
      .put<void>(`${this.databaseUrl}/charts/${chart.id}.json`, chart)
      .pipe(
        catchError((error) => {
          console.error('Error updating chart:', error);
          return throwError(() => new Error('Failed to update chart'));
        })
      );
  }

  deleteChart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.databaseUrl}/charts/${id}.json`).pipe(
      catchError((error) => {
        console.error('Error deleting chart:', error);
        return throwError(() => new Error('Failed to delete chart'));
      })
    );
  }
}
