import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { updateDateRange } from '../../store/chart/chart.actions';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

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
  ],
})
export class DateRangeFilterComponent implements OnInit {
  dateRangeForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    // Initialize the form in the constructor
    this.dateRangeForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit() {
    // If you need to do any additional setup, you can do it here
  }

  onSubmit() {
    if (this.dateRangeForm.valid) {
      const { startDate, endDate } = this.dateRangeForm.value;
      this.store.dispatch(updateDateRange({ startDate, endDate }));
    }
  }
}
