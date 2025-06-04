import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AddTaskPopupComponent } from "./popups/addd-task-popup/add-task-popup.component";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [CommonModule, MainFooterComponent, TaskListComponent, UserHeaderComponent, AddTaskPopupComponent],
})
export class ListsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
