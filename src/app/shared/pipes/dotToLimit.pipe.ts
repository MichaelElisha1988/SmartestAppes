import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDotLimit',
})
export class ToDotLimitPipe implements PipeTransform {
  transform(value: any, limit: number, ...args: any[]) {
    return value.length > limit
      ? value[0].toUpperCase() + value.slice(1, limit).toLowerCase() + '.'
      : value[0].toUpperCase() + value.slice(1, value.length).toLowerCase();
  }
}
