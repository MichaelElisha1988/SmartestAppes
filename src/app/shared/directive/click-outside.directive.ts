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
    this.clickedOn(event);
  }

  private clickedOn(event: PointerEvent) {
    let lastEvent = this.dataSavingSrv.getLastClickedOn();
    switch (document.querySelector('.open')?.classList[0]) {
      case 'translate':
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
