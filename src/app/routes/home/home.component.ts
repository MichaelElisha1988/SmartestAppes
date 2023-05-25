import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  menuAfterInitDone: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.menuAfterInitDone = true;
  }

}
