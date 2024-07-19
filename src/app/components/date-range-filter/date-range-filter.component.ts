import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { updateDateRange } from '../../store/chart/chart.actions';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css'],
})
export class DateRangeFilterComponent {
  dateRangeForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.dateRangeForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });
  }

  onSubmit() {
    if (this.dateRangeForm.valid) {
      const { startDate, endDate } = this.dateRangeForm.value;
      this.store.dispatch(updateDateRange({ startDate, endDate }));
    }
  }
}
