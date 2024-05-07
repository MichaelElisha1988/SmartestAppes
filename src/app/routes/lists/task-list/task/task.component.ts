import { CommonModule, NgSwitch } from '@angular/common';
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
  expandTask: boolean = false;
  lastexpandTask: any = null;

  constructor(private readonly dataSrv: DataService) {
    this.dataSrv.taskList$.subscribe((listupdatas) => {
      this.taskList = listupdatas;
    });
    this.dataSrv.ListIdChg$.subscribe((onChgSelection) => {
      this.shownList = this.taskList.filter((x) => x.listID == onChgSelection);
    });
  }

  ngOnInit(): void {}

  expand(event: any) {
    if (event.target?.classList?.contains('task')) {
      this.lastexpandTask?.target?.classList?.remove('extend');
      event.target.classList.add('extend');
      this.lastexpandTask = event;
    }
  }

  taskDone(task: TaskModel) {
    task
      ? task?.currentStatus! >= 4
        ? (task.currentStatus = 1)
        : task.currentStatus!++
      : '';
  }

  deleteTask(event: any) {
    this.dataSrv.deleteTask(event.target.attributes['taskId'].value);
  }
}
