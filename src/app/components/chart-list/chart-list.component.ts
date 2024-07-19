import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from '../../store/chart/chart.model'; // Adjust this path if needed
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { DateRangeFilterComponent } from '../date-range-filter/date-range-filter.component';
import { Store } from '@ngrx/store';
import * as ChartActions from '../../store/chart/chart.actions'; // Import chart actions
import { selectAllCharts } from '../../store/chart/chart.selectors'; // Assuming you have selectAllCharts selector

@Component({
  selector: 'app-chart-list',
  standalone: true,
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
  imports: [HighchartsChartModule, CommonModule, DateRangeFilterComponent],
})
export class ChartListComponent implements OnInit {
  charts$: Observable<Chart[]> = this.store.select(selectAllCharts); // Get charts from the store
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private store: Store<any>) {} // Inject Store service

  ngOnInit(): void {
    // Dispatch the action to load charts from local storage
    this.store.dispatch(ChartActions.loadCharts());
  }

  getChartOptions(chart: Chart): Highcharts.Options {
    return {
      title: { text: chart.name },
      xAxis: { categories: chart.labels },
      series: [
        { data: chart.data, type: chart.type as any, color: chart.color },
      ],
    };
  }
}
