import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralDataService } from 'src/app/shared/services/generalData.service';
import { Subscription } from 'rxjs';
import { Header } from 'src/app/shared/models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  isOpenTrans: boolean = false;
  isOpenMenu: boolean = false;
  isOpenAcc: boolean = false;

  $Subs = new Subscription();

  functionScript: any;
  jsSrvScript: any;
  stylesEl: any;

  innerHeaderData: Header | undefined;

  constructor(private generalDataService: GeneralDataService) {
    this.$Subs.add(
      this.generalDataService.headerInnerData.subscribe((data) => {
        this.innerHeaderData = data;
      })
    );
  }

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

    this.stylesEl = document.createElement('style');
    this.stylesEl.innerHTML = `
    #goog-gt-vt{
      display: none;
    }
    #goog-gt-tt{
      display: none;
    }
    body{
      top: 0 !important;
      position: relative;
    }
    .skiptranslate{
      position: absolute;
      z-index:1
    }`;

    this.jsSrvScript = document.createElement('script');
    this.jsSrvScript.type = 'text/javascript';
    this.jsSrvScript.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;

    document.body.appendChild(this.functionScript);
    document.body.appendChild(this.jsSrvScript);
    document.body.appendChild(this.stylesEl);
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

  ngOnDestroy() {
    this.$Subs.unsubscribe();
  }
}
