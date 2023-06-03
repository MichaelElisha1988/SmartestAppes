import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comp/header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './routes/login/login.component';
import { HomeComponent } from './routes/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MeasurementsComponent } from './comp/measurements/measurements.component';
import { MeasurmentsPipe } from './shared/pipes/measurments.pipe';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, HomeComponent, MeasurementsComponent, MeasurmentsPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
