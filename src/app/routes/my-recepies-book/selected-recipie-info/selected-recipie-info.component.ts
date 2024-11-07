import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipiesDataService } from '../recipies-data.service';
import { MealModel } from 'src/app/shared/models/meal.model';
import { take } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { TaskModel } from 'src/app/shared/models/task.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { ListId } from 'src/app/shared/models/list-id.model';

@Component({
  selector: 'app-selected-recipie-info',
  templateUrl: './selected-recipie-info.component.html',
  styleUrls: ['./selected-recipie-info.component.scss'],
})
export class SelectedRecipieInfoComponent implements OnInit {
  recipie: MealModel | null = null;
  private dataSrv = inject(DataService);
  private loginName = this.dataSrv.getLoginName();

  constructor(private router: Router, private recipieSrv: RecipiesDataService) {
    this.recipieSrv
      .getSearchedById(
        this.router.url.split('/')[this.router.url.split('/').length - 1]
      )
      .pipe(take(1))
      .subscribe((data) => {
        this.recipie = data.meals[0];
      });
  }
  addIng(ingInfo?: string, addIng?: string) {
    let tmpListId: ListId[] = this.dataSrv.getListId();
    let shoppingListId = tmpListId.find((x: ListId) => {
      return x.name == 'shopping list';
    });

    this.dataSrv.favoriteMealList.find((x) => {
      return x.name == this.recipie!.strMeal;
    })
      ? ''
      : this.dataSrv.updateFavoriteMeal(this.recipie!.strMeal);
    if (shoppingListId) {
      this.dataSrv.selectedId = shoppingListId!.id;
      this.createTaskModel(ingInfo ? ingInfo : '', addIng ? addIng : '')
        ? this.dataSrv.updateTaskList(
            this.createTaskModel(ingInfo ? ingInfo : '', addIng ? addIng : '')!
          )
        : '';
    } else {
      this.dataSrv.updateListId('shopping list');
      tmpListId = this.dataSrv.getListId();
      shoppingListId = tmpListId.find((x: ListId) => {
        return x.name == 'shopping list';
      });
      this.dataSrv.selectedId = shoppingListId!.id;
      this.createTaskModel(ingInfo ? ingInfo : '', addIng ? addIng : '')
        ? this.dataSrv.updateTaskList(
            this.createTaskModel(ingInfo ? ingInfo : '', addIng ? addIng : '')!
          )
        : '';
    }
  }

  createTaskModel(ingInfo: string, addIng: string): TaskModel | null {
    debugger;
    let task = this.dataSrv.taskList.find((x) => {
      return x.task == addIng;
    });
    if (task) {
      task.taskinfo =
        task.taskinfo + ',' + this.recipie!.strMeal + ' - ' + ingInfo;
      this.dataSrv.updateTaskData(task);
      return null;
    } else {
      return {
        listID: 0,
        id: 0,
        task: addIng ? addIng : '',
        taskinfo: this.recipie!.strMeal + ' - ' + ingInfo,
        author: this.loginName,
        date: new Date().getDate().toString(),
        status: 'false',
        currentStatus: 1,
        editMode: false,
        seeInfo: false,
        color: Math.floor(Math.random() * 16777215).toString(16),
        isCheckBox: true,
        didIt: false,
      };
    }
  }

  ngOnInit(): void {}
}
