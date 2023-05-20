import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpenTrans: boolean = false;
  isOpenMenu: boolean = false;
  isOpenAcc: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  openTrans(): void {
    this.isOpenTrans = !this.isOpenTrans;
  }
  openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
  openAcc() {
    this.isOpenAcc = !this.isOpenAcc;
  }
}
