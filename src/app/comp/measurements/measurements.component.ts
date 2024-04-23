import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Home } from 'src/app/shared/models/home.model';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit, AfterViewInit {
  @Input() measureData: any = null;
  @Input() desityData: any = null;

  @Output() exitFromMeasure: EventEmitter<any> = new EventEmitter();

  optionValueSelected: string | undefined | null = '';
  amountMeasure: string | undefined | null = '';

  measurmentsListFiltred: string[] = [];
  textDensity: string = '';
  isCompReady: boolean = false;
  measureForm = new FormGroup({
    measureNum: new FormControl('', Validators.required),
    measurment: new FormControl('', Validators.required),
    density: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {
    this.measurmentsListFiltred = this.measureData[0]?.measurements.slice();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isCompReady = true;
    }, 500);
  }

  onClose() {
    this.measureData = null;
    this.exitFromMeasure.emit();
  }

  selectedDensity(densityNum: any) {
    this.textDensity = this.measureForm.controls.density.value
      ? this.measureForm.controls.density.value
      : '';
  }

  onSubmit() {
    if (
      this.measureForm.get('measurment')?.value &&
      this.measureForm.get('measureNum')?.value
    ) {
      this.measurmentsListFiltred = this.measureData[0]?.measurements.slice();
      this.amountMeasure = this.measureForm.get('measureNum')?.value;
      this.optionValueSelected = this.measureForm.get('measurment')?.value;
      this.measurmentsListFiltred = this.measurmentsListFiltred.filter(
        (value) => value !== this.measureForm.get('measurment')?.value
      );
    }
  }

  onSubmitChage() {
    this.onSubmit();
  }
}
