import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chart } from '../../store/chart/chart.model'; // Update this import path if needed
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-list',
  standalone: true,
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
  imports: [HighchartsChartModule, CommonModule],
})
export class ChartListComponent implements OnInit {
  charts$: Observable<Chart[]> = new Observable<Chart[]>();
  Highcharts: typeof Highcharts = Highcharts;

  ngOnInit(): void {
    this.charts$ = of([
      this.generateRandomChartData(10),
      this.generateRandomChartData(10),
    ]);
  }

  generateRandomChartData(numPoints: number): Chart {
    const data: number[] = [];
    const labels: string[] = [];
    for (let i = 0; i < numPoints; i++) {
      data.push(Math.random() * 100);
      labels.push(`Point ${i + 1}`);
    }
    return {
      id: Math.random().toString(),
      name: 'Random Chart',
      type: 'line',
      data,
      labels,
    };
  }

  getChartOptions(chart: Chart): Highcharts.Options {
    return {
      chart: {
        type: chart.type as any,
      },
      title: {
        text: chart.name,
      },
      xAxis: {
        categories: chart.labels,
      },
      yAxis: {
        title: {
          text: 'Value',
        },
      },
      series: [
        {
          type: chart.type as any,
          name: chart.name,
          data: chart.data,
        } as any,
      ],
    };
  }
}
