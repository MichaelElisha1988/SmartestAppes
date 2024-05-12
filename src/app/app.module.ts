import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comp/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';

import { GtagModule } from 'angular-gtag';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MeasurementsComponent } from './comp/measurements/measurements.component';
import { MeasurmentsPipe } from './shared/pipes/measurments.pipe';
import { ClickOutsideDirective } from './shared/directive/click-outside.directive';
import { ToDotLimitPipe } from './shared/pipes/dotToLimit.pipe';
import { ToOrderPipe } from './shared/pipes/instructorOrder.pipe';
import { PolicyComponent } from './routes/policy/policy.component';
import { ListsComponent } from './routes/lists/lists.component';
import { UserHeaderComponent } from './routes/lists/user-header/user-header.component';
import { TaskListComponent } from './routes/lists/task-list/task-list.component';
import { TaskComponent } from './routes/lists/task-list/task/task.component';
import { MainFooterComponent } from './routes/lists/main-footer/main-footer.component';
import { AddTaskPopupComponent } from './routes/lists/popups/addd-task-popup/add-task-popup.component';
import { MyRecepiesBookComponent } from './routes/my-recepies-book/my-recepies-book.component';
import { SelectedRecipieInfoComponent } from './routes/my-recepies-book/selected-recipie-info/selected-recipie-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    MeasurementsComponent,
    MeasurmentsPipe,
    ToOrderPipe,
    ToDotLimitPipe,
    ClickOutsideDirective,
    PolicyComponent,
    ListsComponent,
    UserHeaderComponent,
    TaskListComponent,
    TaskComponent,
    MainFooterComponent,
    AddTaskPopupComponent,
    MyRecepiesBookComponent,
    SelectedRecipieInfoComponent,
  ],
  imports: [
    BrowserModule,
    GtagModule.forRoot({ trackingId: 'G-726X1R2X45', trackPageviews: true }),
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
