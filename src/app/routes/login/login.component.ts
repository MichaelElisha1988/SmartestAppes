import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralDataService } from 'src/app/shared/services/generalData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    usenName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.loginForm.get('usenName')?.value ||
      this.loginForm.get('password')?.value
    ) {
      this.loginForm.patchValue({ usenName: 'Anonymus' });
      this.loginForm.patchValue({ password: '123123123' });

      sessionStorage.setItem('usenName', 'Anonymus');
    }

    this.router.navigate(['/home']);
  }
}
