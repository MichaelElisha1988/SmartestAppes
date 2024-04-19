import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actions, Home } from 'src/app/shared/models/home.model';
import { GeneralDataService } from 'src/app/shared/services/generalData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  menuAfterInitDone: boolean = false;

  constructor(private generalDataSrvice: GeneralDataService) {}

  $Subs = new Subscription();
  homeData: Home | null = null;
  measureDataToShow: boolean = false;
  measureData: any = null;
  actionsList: any = [];

  ngOnInit() {
    this.$Subs.add(
      this.generalDataSrvice.homeInnerData.subscribe((data) => {
        this.homeData = data;
        this.homeData.actions.forEach((action) =>
          this.actionsList.push(action['title'])
        );
      })
    );
  }

  showMeasures(event: any) {
    this.menuAfterInitDone = false;
    this.measureDataToShow = true;
    this.measureData = this.homeData?.actions.filter(
      (value) =>
        value['title'] ===
        this.actionsList[event?.target.attributes['id']?.value]
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.returnToMenu();
    });
  }

  returnToMenu() {
    this.menuAfterInitDone = true;
    this.measureDataToShow = false;
  }

  ngOnDestroy(): void {
    this.$Subs.unsubscribe();
  }
}
