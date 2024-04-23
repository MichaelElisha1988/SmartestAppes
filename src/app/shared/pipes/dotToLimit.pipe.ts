import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDotLimit',
})
export class ToDotLimitPipe implements PipeTransform {
  transform(value: any, limit: number, ...args: any[]) {
    return value.length > limit ? value.slice(0, limit) + '.' : value;
  }
}
