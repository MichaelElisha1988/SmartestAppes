import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../../../shared/models/task.model';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskList: TaskModel[] = [];
  shownList: TaskModel[] = [];

  constructor(private readonly dataSrv: DataService) {
    this.dataSrv.taskList$.subscribe((listupdatas) => {
      this.taskList = listupdatas;
    });
    this.dataSrv.ListIdChg$.subscribe((onChgSelection) => {
      this.shownList = this.taskList.filter((x) => x.listID == onChgSelection);
    });
  }

  ngOnInit(): void {}

  taskDone(event: any) {
    // this.taskList.map((x) =>
    //   x.taskData.id == id
    //     ? x.taskData.status == 'done'
    //       ? (x.taskData.status = "don't you forget")
    //       : (x.taskData.status = 'done')
    //     : ''
    // );
    // this.dataSrv.afterChangeTaskListUpdate(this.taskList);
  }

  deleteTask(event: any) {
    this.dataSrv.deleteTask(event.target.attributes['taskId'].value);
  }
}
