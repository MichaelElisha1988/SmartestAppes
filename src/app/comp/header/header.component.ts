import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isOpenTrans: boolean = false;
  isOpenMenu: boolean = false;
  isOpenAcc: boolean = false;

  functionScript: any;
  jsSrvScript: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.functionScript = document.createElement('script');
    this.functionScript.type = 'text/javascript';
    this.functionScript.innerHTML = `
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
          {pageLanguage: 'en'},
          'google_translate_element'
      );
    }`;

    this.jsSrvScript = document.createElement('script');
    this.jsSrvScript.type = 'text/javascript';
    this.jsSrvScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;

    document.body.appendChild(this.functionScript);
    document.body.appendChild(this.jsSrvScript);
  }

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
