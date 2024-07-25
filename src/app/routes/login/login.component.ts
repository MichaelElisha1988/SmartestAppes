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
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    passwordConfirm: new FormControl('', {
      updateOn: 'change',
      validators: [],
    }),
  });
  errorMsg: string | null = null;
  isRegister: boolean = false;
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
        this.errorMsg =
          data != null
            ? (data as string).split(':')[1].trim().toLowerCase()
            : null;
      })
    );
    this.loginForm.updateValueAndValidity();
  }

  Sub$ = new Subscription();

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  register() {
    this.isRegister = !this.isRegister;
    this.errorMsg = '';
    this.isRegister
      ? this.loginForm.controls.passwordConfirm.addValidators(
          Validators.required
        )
      : this.loginForm.controls.passwordConfirm.removeValidators(
          Validators.required
        );

    this.loginForm.controls.passwordConfirm.updateValueAndValidity();
  }

  onSubmit(isRegister: boolean) {
    this.errorMsg = '';
    if (isRegister) {
      if (
        this.loginForm.controls.password.value ===
        this.loginForm.controls.passwordConfirm.value
      ) {
        this.loginSrv.createAccount(
          this.loginForm.controls.usenName.value!,
          this.loginForm.controls.password.value!
        ),
          setTimeout(() => {
            this.loginSrv.signIn(
              this.loginForm.controls.usenName.value!,
              this.loginForm.controls.password.value!
            );
          }, 1000);
      } else {
        this.errorMsg =
          'Please make sure that the Email is currect and the password is eqal';
      }
    } else {
      this.loginSrv.signIn(
        this.loginForm.controls.usenName.value!,
        this.loginForm.controls.password.value!
      );
    }
  }
}
