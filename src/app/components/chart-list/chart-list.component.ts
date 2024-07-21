import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from '../../store/chart/chart.model';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { DateRangeFilterComponent } from '../date-range-filter/date-range-filter.component';
import { Store } from '@ngrx/store';
import * as ChartActions from '../../store/chart/chart.actions';
import { selectChartsWithinDateRange } from '../../store/chart/chart.selectors';
import memoize from 'memoize-one';

@Component({
  selector: 'app-chart-list',
  standalone: true,
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
  imports: [HighchartsChartModule, CommonModule, DateRangeFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush strategy
})
export class ChartListComponent implements OnInit {
  charts$: Observable<Chart[]> = this.store.select(selectChartsWithinDateRange);
  Highcharts: typeof Highcharts = Highcharts;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ChartActions.loadCharts());
  }

  getChartOptions = memoize((chart: Chart): Highcharts.Options => {
    return {
      title: { text: chart.name },
      xAxis: { categories: chart.labels },
      series: [
        { data: chart.data, type: chart.type as any, color: chart.color },
      ],
    };
  });

  trackByChartId(index: number, chart: Chart): string {
    return chart.id; // Assuming `id` is a unique identifier for each chart
  }
}
