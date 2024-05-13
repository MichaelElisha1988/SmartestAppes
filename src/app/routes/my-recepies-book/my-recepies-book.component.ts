import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscriber, Subscription, take } from 'rxjs';
import { RecipiesDataService } from './recipies-data.service';
import { MealModel } from 'src/app/shared/models/meal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-recepies-book',
  templateUrl: './my-recepies-book.component.html',
  styleUrls: ['./my-recepies-book.component.scss'],
})
export class MyRecepiesBookComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    search: new FormControl('', { updateOn: 'change' }),
    searchMeal: new FormControl(null, { updateOn: 'change' }),
  });

  Sub$ = new Subscription();

  selectedMeal: MealModel | undefined;
  tenMealsInStok: MealModel[] = [];
  searchMealsInStok: MealModel[] | null = null;

  constructor(
    private recipiesSrv: RecipiesDataService,
    private router: Router
  ) {
    this.Sub$.add(
      this.searchForm.controls.search.valueChanges.subscribe((value) => {
        if ((value as string)?.length >= 2) {
          this.recipiesSrv
            .getMealByName(value as string)
            .pipe(take(1))
            .subscribe((data) => {
              this.searchMealsInStok = data.meals;
            });
        } else {
          this.searchMealsInStok = null;
        }
      })
    );
    this.Sub$.add(
      this.recipiesSrv.getRandomMeal().subscribe((data) => {
        this.selectedMeal = data.meals[0];
      })
    );
    this.Sub$.add(
      this.searchForm.controls.searchMeal.valueChanges.subscribe((data) => {
        this.recipiesSrv
          .getSearchedById(data!)
          .pipe(take(1))
          .subscribe((data) => {
            this.selectedMeal = data.meals[0];
          });
      })
    );
    for (let index = 0; index < 9; index++) {
      var alphabet = 'abcdefghijklmnopqrstuvwxyz';
      let r = alphabet[Math.floor(Math.random() * alphabet.length)];
      this.recipiesSrv
        .getSearchedByFirstLetter(r)
        .pipe(take(1))
        .subscribe((data) => {
          this.tenMealsInStok?.push(
            data.meals[Math.floor(Math.random() * (data.meals.length - 1))]
          );
        });
    }
  }

  ViewuserDetail(user_id: any) {
    this.router.navigate(['/recipies', user_id]);
  }

  selectMeal(meal: MealModel) {
    this.selectedMeal = meal;
  }

  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  ngOnInit(): void {}
}
