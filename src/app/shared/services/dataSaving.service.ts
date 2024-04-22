import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSavingService {
  lastClickedOn = new BehaviorSubject<PointerEvent | null>(null);
  activeMenu = new BehaviorSubject<string | null>(null);
  settingsEdit = new BehaviorSubject<boolean>(false);

  constructor() {}
  setLastClickedOn(ev: PointerEvent | null) {
    this.lastClickedOn.next(ev);
  }
  getLastClickedOn(): PointerEvent | null {
    return this.lastClickedOn?.value;
  }
  setActiveMenu(ev: string | null) {
    this.activeMenu.next(ev);
  }
  getActiveMenu(): string | null {
    return this.activeMenu?.value;
  }
  setSettingsEdit(ev: boolean) {
    this.settingsEdit.next(ev);
  }
  getSettingsEdit(): boolean {
    return this.settingsEdit?.value;
  }
}
