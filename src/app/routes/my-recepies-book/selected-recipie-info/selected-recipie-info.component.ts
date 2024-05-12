import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipiesDataService } from '../recipies-data.service';
import { MealModel } from 'src/app/shared/models/meal.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-selected-recipie-info',
  templateUrl: './selected-recipie-info.component.html',
  styleUrls: ['./selected-recipie-info.component.scss'],
})
export class SelectedRecipieInfoComponent implements OnInit {
  recipie: MealModel | null = null;

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

  ngOnInit(): void {}
}
