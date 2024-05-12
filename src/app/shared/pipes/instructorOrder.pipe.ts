import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toOrder',
})
export class ToOrderPipe implements PipeTransform {
  tmpInstructor: string = '';
  transform(value: any) {
    this.tmpInstructor = value
      .split(/(\d+\.)/)
      .map((x: string, index = 0) =>
        index % 2 == 1
          ? `<span class="step">${x}</span>`
          : `<span class="step-text">${x}</span><br>`
      )
      .join('');
    return this.tmpInstructor;
  }
}
