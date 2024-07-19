// src/app/services/chart-data.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  generateChartData(numPoints: number): { date: Date; value: number }[] {
    const data = [];
    const now = new Date();
    for (let i = 0; i < numPoints; i++) {
      data.push({
        date: new Date(now.getTime() - (numPoints - i) * 24 * 60 * 60 * 1000),
        value: Math.random() * 100,
      });
    }
    return data;
  }
}
