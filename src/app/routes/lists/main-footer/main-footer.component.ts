import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopUpService } from '../../../shared/services/popups.service';
import { DataService } from '../../../shared/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly popupSrv: PopUpService,
    private readonly dataSrv: DataService
  ) {}
  listIdIsEmpty: boolean = false;
  Sub$ = new Subscription();

  ngOnInit(): void {
    this.Sub$.add(
      this.dataSrv.ListId$.subscribe((listId) => {
        listId.length > 0 ? (this.listIdIsEmpty = true) : '';
      })
    );
  }
  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  openAddTask() {
    document.body.style.overflow = 'hidden';
    this.popupSrv.addTaskOCPopUp(false);
  }
}
