import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Components
import { ChartListComponent } from './components/chart-list/chart-list.component';
import { DateRangeFilterComponent } from './components/date-range-filter/date-range-filter.component';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';
import { ChartSettingsComponent } from './components/chart-settings/chart-settings.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    DateRangeFilterComponent,
    ChartModalComponent,
    // any other components
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [provideRouter(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
