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

  private initialCharts: Chart[] = [
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

  populateInitialCharts(): Observable<any> {
    return from(this.initialCharts).pipe(
      mergeMap((chart) => this.storeChart(chart)),
      catchError((error) => {
        console.error('Error populating initial charts:', error);
        return throwError(() => new Error('Failed to populate initial charts'));
      })
    );
  }

  storeChart(chart: Chart): Observable<string> {
    return this.http
      .post<{ name: string }>(`${this.databaseUrl}/charts.json`, chart)
      .pipe(
        map((response) => response.name),
        catchError((error) => {
          console.error('Error storing chart:', error);
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
