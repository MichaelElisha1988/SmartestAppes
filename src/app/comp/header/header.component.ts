import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Subscription, debounce, debounceTime, first, take } from 'rxjs';
import { Header } from 'src/app/shared/models/header.model';
import { DataSavingService } from 'src/app/shared/services/dataSaving.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  isOpenTrans: boolean = false;
  isOpenMenu: boolean = false;
  isOpenAcc: boolean = false;
  editMode: boolean = false;

  $Subs = new Subscription();

  functionScript: any;
  jsSrvScript: any;
  stylesEl: any;
  isAfterLogin: boolean = false;

  innerHeaderData: Header | undefined;

  constructor(
    private loginService: LoginService,
    private dataSavingSrv: DataSavingService,
    private router: Router
  ) {
    this.editMode = sessionStorage.getItem('editMode') == 'true';
    this.$Subs.add(
      this.loginService.afterlogin$.subscribe((data) => {
        this.isAfterLogin = data;
      })
    );
    this.$Subs.add(
      this.loginService.headerInnerData.subscribe((data) => {
        this.innerHeaderData = data;
      })
    );
    this.$Subs.add(
      this.dataSavingSrv.lastClickedOn.subscribe((onchange) => {
        onchange == null
          ? (this.isOpenAcc ? (this.isOpenAcc = false) : '',
            this.isOpenMenu ? (this.isOpenMenu = false) : '',
            this.isOpenTrans ? (this.isOpenTrans = false) : '')
          : '';
      })
    );
  }

  close(ack: string) {
    switch (ack) {
      case 'menu':
        this.isOpenMenu ? (this.isOpenMenu = false) : '';
        this.router.navigate(['..']);
        this.dataSavingSrv.setSettingsEdit(true);
        break;
      case 'policy':
        this.isOpenMenu ? (this.isOpenMenu = false) : '';
        this.router.navigate(['/policy']);
        break;
      case 'measurements':
        this.isOpenMenu ? (this.isOpenMenu = false) : '';
        this.router.navigate(['..']);
        break;
      case 'lists':
        this.isOpenMenu ? (this.isOpenMenu = false) : '';
        this.router.navigate(['/lists']);
        break;

      default:
        break;
    }
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
      display: none !important;
    }
    #goog-gt-tt{
      display: none;
    }
    .VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q{
      background: transparent;
      box-shadow: 2px 2px 4px transparent;
    }
    .VIpgJd-yAWNEb-L7lbkb{
      display: none !important;
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
