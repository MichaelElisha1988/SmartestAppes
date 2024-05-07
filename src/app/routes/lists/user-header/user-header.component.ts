import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit, AfterViewInit {
  todayDate: Date = new Date();
  dayDate: string = '';
  loginName: string = '';

  @ViewChild('dateString', { static: false }) dateString:
    | ElementRef
    | undefined;

  constructor(private dataSrv: DataService) {}

  ngOnInit(): void {
    this.loginName = this.dataSrv.getLoginName();
  }

  ngAfterViewInit(): void {
    this.dataSrv.setDateString(
      this.dateString?.nativeElement.innerHTML as string
    );
  }
}
