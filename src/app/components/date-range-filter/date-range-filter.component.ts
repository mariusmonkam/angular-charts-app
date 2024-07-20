import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
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
export class DateRangeFilterComponent implements OnInit, OnDestroy {
  dateRangeForm: FormGroup;
  private resizeSubscription: any;

  @Output() dateRangeChanged = new EventEmitter<{
    startDate: string | null;
    endDate: string | null;
  }>();

  constructor(private fb: FormBuilder, private store: Store) {
    this.dateRangeForm = this.fb.group({
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit() {
    // Initialize any additional setup or subscriptions if necessary
  }

  ngOnDestroy() {
    // Cleanup logic if needed
    // For example, if there are any subscriptions or event listeners, unsubscribe or remove them here.
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.dateRangeForm.valid) {
      const { startDate, endDate } = this.dateRangeForm.value;
      this.store.dispatch(ChartActions.updateDateRange({ startDate, endDate }));
      this.dateRangeChanged.emit({ startDate, endDate });
    }
  }
}
