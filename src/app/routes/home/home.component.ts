import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Actions, Home } from 'src/app/shared/models/home.model';
import { DataSavingService } from 'src/app/shared/services/dataSaving.service';
import { GeneralDataService } from 'src/app/shared/services/generalData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  menuAfterInitDone: boolean = false;
  menuSettingEdit: boolean = false;

  constructor(
    private generalDataSrvice: GeneralDataService,
    private dataSavingSrv: DataSavingService,
    private router: Router
  ) {}

  $Subs = new Subscription();
  homeData: Home | null = null;
  measureDataToShow: boolean = false;
  measureData: any = null;
  actionsList: any = [];
  allDesityList: any = [];
  selectedDesityList: any = [];
  notInList: Home | null = null;

  ngOnInit() {
    localStorage.getItem('notInList')
      ? (this.notInList = JSON.parse(localStorage.getItem('notInList')!))
      : '';
    this.$Subs.add(
      this.generalDataSrvice.homeInnerData.pipe(take(1)).subscribe((data) => {
        this.homeData = data;
        this.homeData.actions.forEach((action) => {
          this.actionsList.push(action['title']);
          if (action['desity']) {
            this.allDesityList.push({
              title: action['title'],
              desity: [...action['desity']],
            });
          }
        });
      })
    );
    this.$Subs.add(
      this.dataSavingSrv.settingsEdit.subscribe((data) => {
        this.measureDataToShow = false;
        this.menuAfterInitDone = true;
        this.menuSettingEdit = data;
        this.menuSettingEdit ? this.initDisabledList() : '';
      })
    );
  }

  initDisabledList() {
    setTimeout(() => {
      this.notInList?.actions.forEach((act) => {
        act['measurements'].forEach((measure) => {
          document
            .querySelector(`.measures > .${measure}`)
            ?.classList.add('disabled');
        });
      });
    }, 300);
  }

  showMeasures(event: any) {
    this.measureData = JSON.parse(
      JSON.stringify(
        this.homeData?.actions.filter(
          (value) =>
            value['title'] ===
            this.actionsList[event?.target.attributes['id']?.value]
        )
      )
    );

    this.selectedDesityList = this.allDesityList.filter(
      (x: { title: any }) =>
        x.title == this.actionsList[event?.target.attributes['id']?.value]
    );

    let indexOfNotShowMeasures = this.notInList?.actions.findIndex(
      (x) =>
        x['title'] == this.actionsList[event?.target.attributes['id']?.value]
    );

    if (indexOfNotShowMeasures != undefined) {
      this.measureData[0]['measurements'] = this.measureData[0][
        'measurements'
      ].filter(
        (x: string) =>
          !this.notInList?.actions[
            indexOfNotShowMeasures ? indexOfNotShowMeasures : 0
          ]['measurements'].includes(x)
      );
    }
    this.menuAfterInitDone = false;
    this.measureDataToShow = true;
  }

  addRemove(
    event: any,
    homeAction: string[],
    actionMeasure: string,
    i: number
  ) {
    if (!this.notInList) {
      this.notInList = JSON.parse(JSON.stringify(this.homeData));
      this.notInList?.actions.map((x) => {
        x['measurements'] = [];
      });
      localStorage.setItem('notInList', JSON.stringify(this.notInList));
    }

    if ((event.target as Element).classList.contains('disabled')) {
      (event.target as Element).classList.remove('disabled');
      this.notInList!.actions[
        this.notInList!.actions.findIndex((x) => x['title'] == homeAction)
      ]['measurements'] = this.notInList!.actions[
        this.notInList!.actions.findIndex((x) => x['title'] == homeAction)
      ]['measurements'].filter((x) => x != actionMeasure);
    } else {
      (event.target as Element).classList.add('disabled');
      this.notInList?.actions[
        this.notInList?.actions.findIndex((x) => x['title'] == homeAction)
      ]['measurements'].push(actionMeasure);
    }
    localStorage.setItem('notInList', JSON.stringify(this.notInList));
  }

  exitToMenu() {
    this.dataSavingSrv.setSettingsEdit(false);
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
