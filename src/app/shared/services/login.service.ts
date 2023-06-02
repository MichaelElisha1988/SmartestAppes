import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Header } from '../models/header.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  headerInnerData = new Subject<Header>();
  constructor(private http: HttpClient) {
    this.http.get<Header>('assets/headerInnerDate.json').subscribe((data) => {
      this.headerInnerData.next(data);
    });
  }
}
