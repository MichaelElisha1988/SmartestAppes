import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurments',
})
export class MeasurmentsPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    topic: string,
    measureFrom: string | null | undefined,
    measurmentTo: string,
    Density: string
  ): unknown {
    if (!(topic && measureFrom && measurmentTo)) return null;
    let fixedNum = 2;
    console.log(Density);
    switch (topic) {
      case 'Kitchen':
        switch (measureFrom) {
          case 'Quart':
            switch (measurmentTo) {
              case 'Tsp':
                return (+(value ? value : 1) * 0.95 * 1000 * 0.2).toFixed(
                  fixedNum
                );
              case 'Gal':
                return (+(value ? value : 1) * 0.25).toFixed(fixedNum);
              case 'Pint':
                return (+(value ? value : 1) * 2).toFixed(fixedNum);
              case 'Cup':
                return (+(value ? value : 1) * 4).toFixed(fixedNum);
              case 'Tbsp':
                return (+(value ? value : 1) * 0.95 * 1000 * 0.06).toFixed(
                  fixedNum
                );
              case 'k-gram':
                return Density
                  ? (+(value ? value : 1) * 0.95 * +Density).toFixed(fixedNum)
                  : 'Choose Density';
              case 'gram':
                return Density
                  ? ((+(value ? value : 1) * 0.95 * +Density) / 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
              case 'm-gram':
                return Density
                  ? (+(value ? value : 1) * 0.95 * +Density * 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
              case 'Pound':
                return Density
                  ? (+(value ? value : 1) * 0.95 * +Density * 2.204).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
              case 'm-liter':
                return (+(value ? value : 1) * 0.95 * 1000).toFixed(fixedNum);
              case 'liter':
                return (+(value ? value : 1) * 0.95).toFixed(fixedNum);
              case 'Oz':
                return (+(value ? value : 1) * 8 * 2 * 2 * 4).toFixed(fixedNum);
              default:
                return "Can't Measure";
            }
            break;
          case 'Tsp':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 192).toFixed(fixedNum);
              case 'Gal':
                return (+(value ? value : 1) / 768).toFixed(fixedNum);
              case 'Pint':
                return (+(value ? value : 1) / 96).toFixed(fixedNum);

              case 'Cup':
                return (+(value ? value : 1) / 48).toFixed(fixedNum);

              case 'Tbsp':
                return (+(value ? value : 1) / 3).toFixed(fixedNum);

              case 'k-gram':
                return Density ? '' : 'Choose Density';

              case 'Pound':
                return Density ? '' : 'Choose Density';

              case 'm-liter':
                return (+(value ? value : 1) / 4.92).toFixed(fixedNum);

              case 'Oz':
                return (+(value ? value : 1) * 1.5).toFixed(fixedNum);

              default:
                return Density ? '' : 'Choose Density';
            }
            break;
          case 'Gal':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) * 4).toFixed(fixedNum);

              case 'Tsp':
                return (+(value ? value : 1) * 768).toFixed(fixedNum);

              case 'Pint':
                return (+(value ? value : 1) * 8).toFixed(fixedNum);

              case 'Cup':
                return (+(value ? value : 1) * 16).toFixed(fixedNum);

              case 'Tbsp':
                return (+(value ? value : 1) * 256).toFixed(fixedNum);

              case 'k-gram':
                return Density ? '' : 'Choose Density';

              case 'Pound':
                return Density ? '' : 'Choose Density';

              case 'm-liter':
                return (+(value ? value : 1) * 3785.41).toFixed(fixedNum);

              case 'Oz':
                return (+(value ? value : 1) * 128).toFixed(fixedNum);

              default:
                return Density ? '' : 'Choose Density';
            }
            break;
          case 'Pint':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 2).toFixed(fixedNum);

              case 'Tsp':
                return (+(value ? value : 1) * 96).toFixed(fixedNum);

              case 'Gal':
                return (+(value ? value : 1) / 8).toFixed(fixedNum);

              case 'Cup':
                return (+(value ? value : 1) * 2).toFixed(fixedNum);

              case 'Tbsp':
                return (+(value ? value : 1) * 32).toFixed(fixedNum);

              case 'k-gram':
                return Density ? '' : 'Choose Density';

              case 'Pound':
                return Density ? '' : 'Choose Density';

              case 'm-liter':
                return (+(value ? value : 1) * 473.2).toFixed(fixedNum);

              case 'Oz':
                return (+(value ? value : 1) * 16).toFixed(fixedNum);

              default:
                return Density ? '' : 'Choose Density';
            }
            break;
          case 'Cup':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 4).toFixed(fixedNum);

              case 'Tsp':
                return (+(value ? value : 1) * 16 * 16 * 3).toFixed(fixedNum);

              case 'Gal':
                return (+(value ? value : 1) / 16).toFixed(fixedNum);

              case 'Pint':
                return (+(value ? value : 1) / 2).toFixed(fixedNum);

              case 'Tbsp':
                return (+(value ? value : 1) * 16).toFixed(fixedNum);

              case 'k-gram':
                return Density ? '' : 'Choose Density';

              case 'Pound':
                return Density ? '' : 'Choose Density';

              case 'm-liter':
                return (+(value ? value : 1) * 236.6).toFixed();
              default:
                return Density ? '' : 'Choose Density';
            }
            break;
          case 'Tbsp':
            switch (measurmentTo) {
              case 'Quart':
                break;
              case 'Tsp':
                break;
              case 'Gal':
                break;
              case 'Pint':
                break;
              case 'Cup':
                break;
              case 'k-gram':
                break;
              case 'Pound':
                break;
              case 'm-liter':
                break;

              default:
                break;
            }
            break;
          case 'k-gram':
            switch (measurmentTo) {
              case 'Quart':
                break;
              case 'Tsp':
                break;
              case 'Gal':
                break;
              case 'Pint':
                break;
              case 'Cup':
                break;
              case 'Tbsp':
                break;
              case 'Pound':
                break;
              case 'm-liter':
                break;

              default:
                break;
            }
            break;
          case 'Pound':
            switch (measurmentTo) {
              case 'Quart':
                break;
              case 'Tsp':
                break;
              case 'Gal':
                break;
              case 'Pint':
                break;
              case 'Cup':
                break;
              case 'Tbsp':
                break;
              case 'k-gram':
                break;
              case 'm-liter':
                break;

              default:
                break;
            }
            break;
          case 'm-liter':
            switch (measurmentTo) {
              case 'Quart':
                break;
              case 'Tsp':
                break;
              case 'Gal':
                break;
              case 'Pint':
                break;
              case 'Cup':
                break;
              case 'Tbsp':
                break;
              case 'k-gram':
                break;
              case 'Pound':
                break;

              default:
                break;
            }
            break;
          default:
            break;
        }
        break;
      case 'length':
        switch (measureFrom) {
          case 'c-meters':
            switch (measurmentTo) {
              case 'meters':
                return value ? (+value / 100).toFixed(fixedNum) : 1;

              case 'k-meters':
                return value ? (+value / 100000).toFixed(fixedNum) : 1;

              case 'inches':
                return value ? (+value * 0.3937).toFixed(fixedNum) : 1;

              case 'feet':
                return value ? ((+value / 100) * 3.2808).toFixed(fixedNum) : 1;

              case 'yards':
                return value ? ((+value / 100) * 1.0936).toFixed(fixedNum) : 1;

              default:
                break;
            }
            break;
          case 'meters':
            switch (measurmentTo) {
              case 'c-meters':
                return value ? (+value * 100).toFixed(fixedNum) : 1;

              case 'k-meters':
                return value ? ((+value / 1000) * 3.2808).toFixed(fixedNum) : 1;

              case 'inches':
                return value ? (+value * 39.37).toFixed(fixedNum) : 1;

              case 'feet':
                return value ? (+value * 3.2808).toFixed(fixedNum) : 1;

              case 'yards':
                return value ? (+value * 1.0936).toFixed(fixedNum) : 1;

              default:
                break;
            }
            break;
          case 'k-meters':
            switch (measurmentTo) {
              case 'c-meters':
                return value ? (+value / 100000).toFixed(fixedNum) : 1;

              case 'meters':
                return value ? (+value / 1000).toFixed(fixedNum) : 1;

              case 'inches':
                return value ? (+value * 39374).toFixed(fixedNum) : 1;

              case 'feet':
                return value ? (+value * 0.003281).toFixed(fixedNum) : 1;

              case 'yards':
                return value ? (+value * 0.0011).toFixed(fixedNum) : 1;

              default:
                break;
            }
            break;
          case 'inches':
            switch (measurmentTo) {
              case 'c-meters':
                return value ? (+value / 0.3937).toFixed(fixedNum) : 1;

              case 'meters':
                return value ? (+value / 100 / 0.3937).toFixed(fixedNum) : 1;

              case 'k-meters':
                return value ? (+value / 100000 / 0.3937).toFixed(fixedNum) : 1;

              case 'feet':
                return value ? (+value * 0.083334).toFixed(fixedNum) : 1;

              case 'yards':
                return value ? (+value * 0.27778).toFixed(fixedNum) : 1;

              default:
                break;
            }
            break;
          case 'feet':
            switch (measurmentTo) {
              case 'c-meters':
                return value ? (+value * (0.305 / 100)).toFixed(fixedNum) : 1;
              case 'meters':
                return value ? (+value * 0.305).toFixed(fixedNum) : 1;
              case 'k-meters':
                return value
                  ? (+value * (0.305 / 100000)).toFixed(fixedNum)
                  : 1;
              case 'inches':
                return value ? (+value / 0.3937).toFixed(fixedNum) : 1;
              case 'yards':
                return value ? (+value / 0.3937).toFixed(fixedNum) : 1;
              default:
                break;
            }
            break;
          case 'yards':
            switch (measurmentTo) {
              case 'c-meters':
                break;
              case 'meters':
                break;
              case 'k-meters':
                break;
              case 'inches':
                break;
              case 'feet':
                break;
              default:
                break;
            }
            break;

          default:
            break;
        }
        break;
      default:
        break;
    }

    return value;
  }
}
