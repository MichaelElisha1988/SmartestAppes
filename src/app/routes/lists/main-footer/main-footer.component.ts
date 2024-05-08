import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../../../shared/services/popups.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
})
export class MainFooterComponent implements OnInit {
  constructor(
    private readonly popupSrv: PopUpService,
    private readonly dataSrv: DataService
  ) {}
  listIdIsEmpty: boolean = false;

  ngOnInit(): void {
    this.dataSrv.ListId$.subscribe((listId) => {
      listId.length > 0 ? (this.listIdIsEmpty = true) : '';
    });
  }

  openAddTask() {
    document.body.style.overflow = 'hidden'
    this.popupSrv.addTaskOCPopUp(false);
  }
}
