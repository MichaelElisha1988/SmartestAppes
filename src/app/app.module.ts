import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MatIconModule } from '@angular/material/icon';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './shared/directive/click-outside.directive';
import { ToDotLimitPipe } from './shared/pipes/dotToLimit.pipe';
import { ToOrderPipe } from './shared/pipes/instructorOrder.pipe';
import { PolicyComponent } from './routes/policy/policy.component';
import { SelectedRecipieInfoComponent } from './routes/my-recepies-book/selected-recipie-info/selected-recipie-info.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ToOrderPipe,
    ToDotLimitPipe,
    ClickOutsideDirective,
    PolicyComponent,
    SelectedRecipieInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule {}
