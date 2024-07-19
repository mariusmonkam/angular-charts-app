// src/app/components/date-range-filter/date-range-filter.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { updateDateRange } from '../../store/chart/chart.actions';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import * as ChartActions from '../../store/chart/chart.actions';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
})
export class DateRangeFilterComponent implements OnInit {
  dateRangeForm: FormGroup;
  @Output() dateRangeChanged = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.dateRangeForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.dateRangeForm.valid) {
      const { startDate, endDate } = this.dateRangeForm.value;
      this.store.dispatch(updateDateRange({ startDate, endDate }));
      this.dateRangeChanged.emit({ startDate, endDate });
    }
  }
}
