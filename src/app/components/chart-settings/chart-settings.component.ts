import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Chart } from '../../store/chart/chart.model';
import * as ChartSelectors from '../../store/chart/chart.selectors';
import * as ChartActions from '../../store/chart/chart.actions';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Add this import

@Component({
  selector: 'app-chart-settings',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule], // Add MatIconModule here
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
})
export class ChartSettingsComponent implements OnInit {
  charts$: Observable<Chart[]>;

  constructor(private store: Store) {
    this.charts$ = this.store.select(ChartSelectors.selectAllCharts);
  }

  ngOnInit(): void {
    this.store.dispatch(ChartActions.loadCharts());
  }

  deleteChart(id: string): void {
    this.store.dispatch(ChartActions.deleteChart({ id }));
  }
}
