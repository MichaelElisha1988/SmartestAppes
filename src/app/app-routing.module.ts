import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';
import { PolicyComponent } from './routes/policy/policy.component';
import { ListsComponent } from './routes/lists/lists.component';
import { LoginGuard } from './shared/guards/login.guard';
import { MyRecepiesBookComponent } from './routes/my-recepies-book/my-recepies-book.component';
import { SelectedRecipieInfoComponent } from './routes/my-recepies-book/selected-recipie-info/selected-recipie-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'lists', component: ListsComponent, canActivate: [LoginGuard] },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'recipies',
    component: MyRecepiesBookComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'recipies/:id',
    component: SelectedRecipieInfoComponent,
    canActivate: [LoginGuard],
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
