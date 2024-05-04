import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  todayDate: Date = new Date();
  dayDate: string = '';

  constructor() {}

  ngOnInit(): void {}
}
