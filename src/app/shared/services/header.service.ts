import { Injectable } from '@angular/core';
import { Header } from '../models/header.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headerInnerData = new Subject<Header>();



  constructor(private http: HttpClient) {
    this.http.get<Header>('assets/headerInnerDate.json').subscribe((data)=>{
      this.headerInnerData.next(data);
    })

  }
}
