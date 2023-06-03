import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Home } from 'src/app/shared/models/home.model';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit, AfterViewInit {
  @Input() measureData: any = null;

  @Output() exitFromMeasure: EventEmitter<any> = new EventEmitter();

  optioValueSelected: string | undefined | null = '';
  amountMeasure: string | undefined | null = '';

  measurmentsListFiltred: string[] = [];

  isCompReady: boolean = false;
  measureForm= new FormGroup({
    measureNum: new FormControl('', Validators.required),
    measurment: new FormControl('', Validators.required),
  })

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

  onSubmit(){
    this.measurmentsListFiltred = this.measureData[0]?.measurements.slice()
    this.amountMeasure = this.measureForm.get('measureNum')?.value
    this.measureForm.get('measurment')
    this.measurmentsListFiltred = this.measurmentsListFiltred.filter(value => value !== this.measureForm.get('measurment')?.value)
    console.log(this.measureForm.get('measureNum')?.value, this.measureForm.get('measurment')?.value)
  }
  onSubmitChage(){
    this.onSubmit()
  }
}
