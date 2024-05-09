import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { MeasurementsComponent } from './comp/measurements/measurements.component';
import { PolicyComponent } from './routes/policy/policy.component';
import { ListsComponent } from './routes/lists/lists.component';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard],
  },
  { path: 'lists', component: ListsComponent, canActivate: [LoginGuard] },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
