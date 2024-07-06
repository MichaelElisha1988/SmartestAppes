import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedin: boolean = false;

  constructor(private loginSrv: LoginService) {}

  ngOnInit(): void {
    this.loginSrv.afterlogin$.subscribe((data) => {
      this.isLoggedin = data;
    });
  }
}
