import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Chart } from '../../store/chart/chart.model';
import * as ChartActions from '../../store/chart/chart.actions';
import * as ChartSelectors from '../../store/chart/chart.selectors';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ChartSettingsComponent implements OnInit {
  charts$: Observable<Chart[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.charts$ = this.store.select(ChartSelectors.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(ChartActions.loadCharts());
  }

  openChartModal(chart?: Chart): void {
    const dialogRef = this.dialog.open(ChartModalComponent, {
      width: '600px',
      data: chart || {
        labels: [],
        data: [],
        name: '',
        type: 'line',
        color: '#000000',
        startDate: '',
        endDate: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (chart) {
          this.store.dispatch(
            ChartActions.updateChart({ chart: { ...chart, ...result } })
          );
        } else {
          this.store.dispatch(ChartActions.addChart({ chart: result }));
        }
      }
    });
  }

  editChart(chart: Chart): void {
    this.openChartModal(chart);
  }

  deleteChart(id: string): void {
    this.store.dispatch(ChartActions.deleteChart({ id }));
  }

  addChart(): void {
    this.openChartModal();
  }
}
