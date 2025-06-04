import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscriber, Subscription, take } from 'rxjs';
import { RecipiesDataService } from './recipies-data.service';
import { MealModel } from 'src/app/shared/models/meal.model';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-recepies-book',
  templateUrl: './my-recepies-book.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  favoriteMealList: MealModel[] = [];
  notFav: boolean = true;

  constructor(
    private recipiesSrv: RecipiesDataService,
    private router: Router,
    private DataSrv: DataService
  ) {
    this.Sub$.add(
      this.searchForm.controls.search.valueChanges.subscribe((value) => {
        if ((value as string)?.length >= 2) {
          this.recipiesSrv
            .getMealByName(value as string)
            .pipe(take(2))
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
        .pipe(take(2))
        .subscribe((data) => {
          let tmpMeal =
            data?.meals?.[Math.floor(Math.random() * (data.meals?.length - 1))];
          if (tmpMeal) {
            this.tenMealsInStok?.push(tmpMeal);
          }
        });
    }
    this.Sub$.add(
      this.DataSrv.favoriteMealList$.subscribe((mealList) => {
        this.favoriteMealList = [];
        mealList.forEach((mealName) => {
          this.recipiesSrv.getMealByName(mealName.name).subscribe((meal) => {
            this.favoriteMealList.push(meal.meals[0] as MealModel);
          });
        });
      })
    );
    this.DataSrv.getFavoriteMealList();
  }

  ViewuserDetail(user_id: any) {
    this.router.navigate(['/recipies', user_id]);
  }

  addTofavorite(strMeal: string) {
    this.DataSrv.updateFavoriteMeal(strMeal);
    this.notFav = false;
  }

  deleteFromFavorite(meal: MealModel) {
    this.DataSrv.deleteFavoriteMeal(meal.strMeal);
    this.notFav = true;
  }

  selectMeal(meal: MealModel) {
    scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.notFav = true;
    this.favoriteMealList.forEach((mealfav) => {
      mealfav.strMeal == meal.strMeal
        ? (this.notFav = false)
        : this.notFav
        ? (this.notFav = true)
        : (this.notFav = false);
    });
    this.selectedMeal = meal;
  }

  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  ngOnInit(): void {}
}
