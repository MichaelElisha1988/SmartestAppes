import { Injectable } from '@angular/core';
import { Header } from '../models/header.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Home } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralDataService {
  homeInnerData = new Subject<Home>();

  constructor(private http: HttpClient) {
    this.getDataFromJson();
  }

  getDataFromJson() {
    this.http.get<Home>('assets/homeInnerDate.json').subscribe((data) => {
      this.homeInnerData.next(data);
    });
  }
}
