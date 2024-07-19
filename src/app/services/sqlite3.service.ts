// src/app/services/sqlite3.service.ts
import { Injectable } from '@angular/core';
import initSqlJs, { Database } from 'sql.js';
import { Chart } from '../store/chart/chart.model';

@Injectable({
  providedIn: 'root',
})
export class SQLiteChartService {
  private db: Database = null!;

  constructor() {
    this.initDatabase();
  }

  private async initDatabase(): Promise<void> {
    const SQL = await initSqlJs();
    this.db = new SQL.Database();
    this.initializeDatabase();
    await this.initializeCharts();
  }

  private initializeDatabase(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS charts (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        color TEXT,
        data TEXT,
        labels TEXT,
        startDate TEXT,
        endDate TEXT
      );
    `;
    this.db.run(createTableQuery);
  }

  private async initializeCharts(): Promise<void> {
    const existingCharts = await this.getCharts();
    if (existingCharts.length === 0) {
      const initialCharts: Chart[] = [
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

      await Promise.all(initialCharts.map((chart) => this.addChart(chart)));
    }
  }

  async addChart(chart: Chart): Promise<void> {
    const insertQuery = `
      INSERT INTO charts (id, name, type, color, data, labels, startDate, endDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    this.db.run(insertQuery, [
      chart.id,
      chart.name,
      chart.type,
      chart.color,
      JSON.stringify(chart.data),
      JSON.stringify(chart.labels),
      chart.startDate,
      chart.endDate,
    ]);
  }

  async getCharts(): Promise<Chart[]> {
    const selectQuery = `SELECT * FROM charts;`;
    const results = this.db.exec(selectQuery);
    const charts: Chart[] = [];
    if (results.length > 0) {
      results[0].values.forEach((row) => {
        charts.push({
          id: row[0] as string,
          name: row[1] as string,
          type: row[2] as string,
          color: row[3] as string,
          data: JSON.parse(row[4] as string),
          labels: JSON.parse(row[5] as string),
          startDate: row[6] as string,
          endDate: row[7] as string,
        });
      });
    }
    return charts;
  }

  async updateChart(chart: Chart): Promise<void> {
    const updateQuery = `
      UPDATE charts
      SET name = ?, type = ?, color = ?, data = ?, labels = ?, startDate = ?, endDate = ?
      WHERE id = ?;
    `;
    this.db.run(updateQuery, [
      chart.name,
      chart.type,
      chart.color,
      JSON.stringify(chart.data),
      JSON.stringify(chart.labels),
      chart.startDate,
      chart.endDate,
      chart.id,
    ]);
  }

  async deleteChart(id: string): Promise<void> {
    const deleteQuery = `DELETE FROM charts WHERE id = ?;`;
    this.db.run(deleteQuery, [id]);
  }
}
