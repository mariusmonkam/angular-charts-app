import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Chart } from '../../store/chart/chart.model';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChartModalComponent {
  chartForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chart
  ) {
    this.chartForm = this.fb.group({
      id: [data ? data.id : null],
      name: [data ? data.name : '', Validators.required],
      type: [data ? data.type : '', Validators.required],
      color: [data ? data.color : '#000000', Validators.required],
      startDate: [
        data ? data.startDate : '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      endDate: [
        data ? data.endDate : '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      labels: this.fb.array(
        data && data.labels
          ? data.labels.map((label) => this.fb.control(label))
          : [],
        Validators.required
      ),
      data: this.fb.array(
        data && data.data
          ? data.data.map((d) => this.fb.control(d, Validators.required))
          : [],
        Validators.required
      ),
    });
  }

  get dataFormArray(): FormArray {
    return this.chartForm.get('data') as FormArray;
  }

  get labelsFormArray(): FormArray {
    return this.chartForm.get('labels') as FormArray;
  }

  addDataPoint(): void {
    this.dataFormArray.push(this.fb.control(0, Validators.required)); // Default to 0 or another value as needed
    this.labelsFormArray.push(this.fb.control(this.generateDefaultLabel()));
  }

  removeDataPoint(index: number): void {
    this.dataFormArray.removeAt(index);
    this.labelsFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private generateDefaultLabel(): string {
    const labels = this.labelsFormArray.controls;
    const nextIndex = labels.length;
    return String.fromCharCode(65 + nextIndex); // Generates "A", "B", "C", etc.
  }

  formatDate(controlName: string): void {
    const control = this.chartForm.get(controlName);
    if (control) {
      const value = control.value;
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        control.setErrors({ pattern: true });
      } else {
        control.updateValueAndValidity();
      }
    }
  }
}
