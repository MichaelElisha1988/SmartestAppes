import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    usenName: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });
  errorMsg: string | null = null;

  constructor(private router: Router, private loginSrv: LoginService) {
    sessionStorage.getItem('UserDataLogin')
      ? this.router.navigate(['home'])
      : '';
    this.Sub$.add(
      this.loginSrv.login$.subscribe((data) => {
        data != null
          ? (sessionStorage.setItem('UserDataLogin', JSON.stringify(data)),
            this.router.navigate(['/home']))
          : '';
      })
    );
    this.Sub$.add(
      this.loginSrv.loginError$.subscribe((data) => {
        this.errorMsg = data != null ? 'Password or Email are Incorrect' : null;
      })
    );
  }

  Sub$ = new Subscription();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  onSubmit() {
    this.loginSrv.signIn(
      this.loginForm.controls.usenName.value!,
      this.loginForm.controls.password.value!
    );
  }
}
