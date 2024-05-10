import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-recepies-book',
  templateUrl: './my-recepies-book.component.html',
  styleUrls: ['./my-recepies-book.component.scss'],
})
export class MyRecepiesBookComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    search: new FormControl('', { updateOn: 'change' }),
  });

  Sub$ = new Subscription();

  constructor() {
    this.Sub$.add(
      this.searchForm.controls.search.valueChanges.subscribe((value) => {
        console.log((value as string)?.length > 3 ? value : '');
      })
    );
  }

  ngOnDestroy(): void {
    this.Sub$.unsubscribe();
  }

  ngOnInit(): void {}
}
