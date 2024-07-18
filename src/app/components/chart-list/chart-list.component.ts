import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Chart } from '../../store/chart.model';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss'],
})
export class ChartListComponent implements OnInit {
  charts$: Observable<Chart[]>;

  constructor(private store: Store) {
    this.charts$ = this.store.select(ChartSelectors.selectAllCharts);
  }

  ngOnInit(): void {
    this.store.dispatch(ChartActions.loadCharts());
  }
}
