import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart } from '../../store/chart/chart.model';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.scss'],
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
    });
  }

  onSubmit(): void {
    if (this.chartForm.valid) {
      this.dialogRef.close(this.chartForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
