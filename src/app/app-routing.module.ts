import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { MeasurementsComponent } from './comp/measurements/measurements.component';
import { PolicyComponent } from './routes/policy/policy.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  {
    path: 'measurements',
    component: HomeComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  { path: '**', redirectTo: 'measurements' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
