import { Routes } from '@angular/router';
import { ChartListComponent } from './components/chart-list/chart-list.component';
import { ChartSettingsComponent } from './components/chart-settings/chart-settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ChartListComponent },
  { path: 'settings', component: ChartSettingsComponent },
];
