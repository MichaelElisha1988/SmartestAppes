import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime } from 'rxjs';
import { MealModel } from 'src/app/shared/models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class RecipiesDataService {
  private baseURL: string = 'www.themealdb.com/api/json/v1/1/';
  private searchByNameOrLetters: string = 'search.php?s=';
  private searchByFirstLetter: string = 'search.php?f=';
  private searchById: string = 'lookup.php?i=';
  private searchRandomMeals: string = 'random.php';

  constructor(private http: HttpClient) {}

  getRandomMeal(): Observable<any> {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/${this.searchRandomMeals}`
    );
  }

  getMealByName(mealName: string): Observable<any> {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/${this.searchByNameOrLetters}${mealName}`
    );
  }

  getSearchedByFirstLetter(letter: string): Observable<any> {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/${this.searchByFirstLetter}${letter}`
    );
  }

  getSearchedById(id: string): Observable<any> {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/${this.searchById}${id}`
    );
  }
}
