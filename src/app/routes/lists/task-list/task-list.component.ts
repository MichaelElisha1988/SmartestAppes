import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TaskModel } from '../../../shared/models/task.model';
import { CommonModule } from '@angular/common';
import { ListId } from '../../../shared/models/list-id.model';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  listId: ListId[] = [];
  addActive: boolean = false;
  movearound: number = 0;
  @ViewChild('addInput') addInput: ElementRef | undefined;
  @ViewChild('ListId') ListId: ElementRef | undefined;

  constructor(private readonly dataSrv: DataService) {
    this.dataSrv.ListId$.subscribe((listId) => {
      this.listId = listId;
    });
  }

  ngOnInit(): void {}

  addListId(event: any) {
    if (!this.addActive) {
      this.addInput!.nativeElement.value = '';
      this.addActive = true;
    } else {
      this.addActive = false;
      this.addInput!.nativeElement.value != ''
        ? this.dataSrv.updateListId(this.addInput!.nativeElement.value)
        : '';
    }
  }

  getSelectedListId(): number {
    return this.dataSrv.getSelectedListId();
  }

  selectListId(event: any) {
    this.dataSrv.setSelectedListId(event.target.attributes['listId'].value);
  }

  moveAround(moveNum: number) {
    this.ListId?.nativeElement.setAttribute(
      'style',
      `left: ${
        this.movearound + moveNum > 0
          ? this.movearound
          : (this.movearound += moveNum)
      }px;`
    );
  }
}
