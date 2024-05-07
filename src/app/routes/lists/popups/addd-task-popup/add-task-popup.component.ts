import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpService } from '../../../../shared/services/popups.service';
import { DataService } from '../../../../shared/services/data.service';
import { TaskModel } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.scss'],
})
export class AddTaskPopupComponent implements OnInit {
  taskform = new FormGroup({
    task: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    author: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    status: new FormControl("don't you forget", {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });

  hidden: boolean = true;

  constructor(
    private readonly popupSrv: PopUpService,
    private readonly dataSrv: DataService
  ) {
    this.popupSrv.addTask$.subscribe((data: boolean) => {
      this.taskform.controls.date.setValue(this.dataSrv.getDateString());
      this.taskform.controls.author.setValue(this.dataSrv.getLoginName());
      this.onPopup(data);
    });
  }

  ngOnInit(): void {}

  addTask(ev: any) {
    this.dataSrv.updateTaskList(this.createTaskModel());
    this.onPopup(true);
  }

  onPopup(OC: boolean) {
    this.hidden = OC;
  }

  createTaskModel(): TaskModel {
    return {
      listID: 0,
      id: 0,
      task: this.taskform.value.task!,
      author: this.taskform.value.author!,
      date: this.taskform.value.date!,
      status: this.taskform.value.status!,
    };
  }
}
