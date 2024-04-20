import { Directive, ElementRef, HostListener } from '@angular/core';
import { DataSavingService } from '../services/dataSaving.service';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private dataSavingSrv: DataSavingService) {}

  @HostListener('click', ['$event']) onMouseclick(event: PointerEvent) {
    this.dataSavingSrv.getLastClickedOn() != null
      ? ''
      : this.dataSavingSrv.setLastClickedOn(event);
    this.dataSavingSrv.getActiveMenu() != null
      ? ''
      : this.dataSavingSrv.setActiveMenu(
          (event.target as Element)?.classList[0]
        );
    this.clickedOn(event);
  }

  private clickedOn(event: PointerEvent) {
    let lastEvent = this.dataSavingSrv.getLastClickedOn();
    let lastAction = this.dataSavingSrv.getActiveMenu();
    lastAction == (event.target as Element).classList[0]
      ? ''
      : this.closeMenu(lastAction, lastEvent, event);
    this.closeMenu(lastAction, lastEvent, event);
    this.dataSavingSrv.setActiveMenu((event.target as Element).classList[0]);
  }

  closeMenu(
    activeMenuToClose: string | null,
    lastEvent: PointerEvent | null,
    event: PointerEvent
  ) {
    switch (activeMenuToClose) {
      case 'translate':
        (event.target as Element).closest('.open') &&
        (lastEvent?.target as Element).closest('.open')
          ? this.dataSavingSrv.setLastClickedOn(event)
          : (document.querySelectorAll('.open').forEach((el) => {
              el.classList.remove('open');
            }),
            this.dataSavingSrv.setLastClickedOn(null));
        break;
      case 'burger':
        (event.target as Element).closest('.open') &&
        (lastEvent?.target as Element).closest('.open')
          ? this.dataSavingSrv.setLastClickedOn(event)
          : (document.querySelectorAll('.open').forEach((el) => {
              el.classList.remove('open');
            }),
            this.dataSavingSrv.setLastClickedOn(null));
        break;
      default:
        break;
    }
  }
}
