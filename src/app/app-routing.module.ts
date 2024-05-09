import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { MeasurementsComponent } from './comp/measurements/measurements.component';
import { PolicyComponent } from './routes/policy/policy.component';
import { ListsComponent } from './routes/lists/lists.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full',
      },
      { path: 'lists', component: ListsComponent, pathMatch: 'full' },
      {
        path: 'policy',
        component: PolicyComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
