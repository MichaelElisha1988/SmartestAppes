import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSavingService {
  lastClickedOn = new BehaviorSubject<PointerEvent | null>(null);

  constructor() {}
  setLastClickedOn(ev: PointerEvent | null) {
    this.lastClickedOn.next(ev);
  }

  getLastClickedOn(): PointerEvent | null {
    return this.lastClickedOn?.value;
  }
}
