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

  isCompReady: boolean = false;
  measureForm= new FormGroup({
    measureNum: new FormControl('', Validators.required),
    measurment: new FormControl('', Validators.required),
  })

  constructor() {}

  ngOnInit(): void {}

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
    this.measureForm.get('measureNum')
    this.measureForm.get('measurment')
    console.log(this.measureForm.get('measureNum')?.value, this.measureForm.get('measurment')?.value)
  }
}
