import { Component } from '@angular/core';
import { Ga4Service } from './shared/services/ga4.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./comp/header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from './comp/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, FooterComponent],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SmartestAppes';

  constructor(private readonly ga4Srv: Ga4Service) {
    //8Z3X1V9F5E
    this.ga4Srv.loadGa4();
    this.ga4Srv.event('page_view', { page_title: 'Home Page' });
  }
}
