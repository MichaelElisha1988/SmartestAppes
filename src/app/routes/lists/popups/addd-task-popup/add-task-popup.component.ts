import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopUpService } from '../../../../shared/services/popups.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../shared/services/data.service';
import { TaskModel } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.scss'],
})
export class AddTaskPopupComponent implements OnInit {
  taskform = new FormGroup({
    task: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    status: new FormControl("don't you forget", [Validators.required]),
  });

  hidden: boolean = true;

  constructor(
    private readonly popupSrv: PopUpService,
    private readonly dataSrv: DataService
  ) {
    this.popupSrv.addTask$.subscribe((data: boolean) => {
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
