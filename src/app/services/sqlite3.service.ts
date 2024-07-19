import { Injectable } from '@angular/core';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
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
  }

  private initializeDatabase(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS charts (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        color TEXT,
        data TEXT,  -- Storing JSON data as string
        labels TEXT, -- Storing JSON labels as string
        startDate TEXT, -- Add startDate column
        endDate TEXT    -- Add endDate column
      );
    `;
    this.db.run(createTableQuery);
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
      chart.startDate, // Include startDate
      chart.endDate, // Include endDate
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
          startDate: row[6] as string, // Include startDate
          endDate: row[7] as string, // Include endDate
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
      chart.startDate, // Include startDate
      chart.endDate, // Include endDate
      chart.id,
    ]);
  }

  async deleteChart(id: string): Promise<void> {
    const deleteQuery = `DELETE FROM charts WHERE id = ?;`;
    this.db.run(deleteQuery, [id]);
  }
}
