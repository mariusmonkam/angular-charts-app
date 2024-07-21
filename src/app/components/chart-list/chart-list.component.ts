import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartListComponent implements OnInit {
  charts$: Observable<Chart[]> = this.store.select(selectChartsWithinDateRange);
  Highcharts: typeof Highcharts = Highcharts;
  isHighcharts = typeof Highcharts === 'object';
  hasCharts$: Observable<boolean>;

  constructor(private store: Store) {
    this.hasCharts$ = this.charts$.pipe(map((charts) => charts.length > 0));
  }

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
    return chart.id;
  }

  resetFilters(): void {
    this.store.dispatch(ChartActions.resetDateRange()); // Dispatch an action to reset the date range
  }
}
