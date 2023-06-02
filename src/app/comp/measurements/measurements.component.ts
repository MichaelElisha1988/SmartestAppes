import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Home } from 'src/app/shared/models/home.model';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss'],
})
export class MeasurementsComponent implements OnInit {
  @Input() MeasureData: Home | null = null;

  @Output() exitFromMeasure: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.MeasureData = null;
    this.exitFromMeasure.emit();
  }
}
