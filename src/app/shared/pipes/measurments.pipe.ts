import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurments',
})
export class MeasurmentsPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    topic: string,
    measureFrom: string | null | undefined,
    measurmentTo: string
  ): unknown {
    if (!(topic && measureFrom && measurmentTo)) return null;
    switch (topic) {
      case 'Kitchen':
        switch (measureFrom) {
          case 'Quart':
            switch (measurmentTo) {
              case 'Tsp':
                return (+(value ? value : 1) * 0.95 * 1000 * 0.2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 0.95 * 1000 * 0.2)
                      .toString()
                      .indexOf('.')
                      ? (+(value ? value : 1) * 0.95 * 1000 * 0.2)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 0.95 * 1000 * 0.2).toString()
                          .length
                  )
                  .join('');
              case 'Gal':
                return (+(value ? value : 1) * 0.25)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 0.25).toString().indexOf('.')
                      ? (+(value ? value : 1) * 0.25).toString().indexOf('.') +
                          3
                      : (+(value ? value : 1) * 0.25).toString().length
                  )
                  .join('');
              case 'Pint':
                return (+(value ? value : 1) * 2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 2).toString().indexOf('.')
                      ? (+(value ? value : 1) * 2).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 2).toString().length
                  )
                  .join('');
              case 'Cup':
                return (+(value ? value : 1) * 4)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 4).toString().indexOf('.')
                      ? (+(value ? value : 1) * 4).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 4).toString().length
                  )
                  .join('');
              case 'Tbsp':
                return (+(value ? value : 1) * 0.95 * 1000 * 0.06)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 0.95 * 1000 * 0.06)
                      .toString()
                      .indexOf('.')
                      ? (+(value ? value : 1) * 0.95 * 1000 * 0.06)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 0.95 * 1000 * 0.06).toString()
                          .length
                  )
                  .join('');
              case 'k.gram':
                return `can't measure`;
              case 'Pound':
                return `can't measure`;
              case 'm.liter':
                return (+(value ? value : 1) * 0.95 * 1000)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 0.95 * 1000).toString().indexOf('.')
                      ? (+(value ? value : 1) * 0.95 * 1000)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 0.95 * 1000).toString().length
                  )
                  .join('');

              case 'Oz':
                return (+(value ? value : 1) * 8 * 2 * 2 * 4)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 8 * 2 * 2 * 4)
                      .toString()
                      .indexOf('.')
                      ? (+(value ? value : 1) * 8 * 2 * 2 * 4)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 8 * 2 * 2 * 4).toString().length
                  )
                  .join('');

              default:
                return `can't measure`;
            }
            break;
          case 'Tsp':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 192)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 192).toString().indexOf('.')
                      ? (+(value ? value : 1) / 192).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 192).toString().length
                  )
                  .join('');
              case 'Gal':
                return (+(value ? value : 1) / 768)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 768).toString().indexOf('.')
                      ? (+(value ? value : 1) / 768).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 768).toString().length
                  )
                  .join('');

              case 'Pint':
                return (+(value ? value : 1) / 96)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 96).toString().indexOf('.')
                      ? (+(value ? value : 1) / 96).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 96).toString().length
                  )
                  .join('');

              case 'Cup':
                return (+(value ? value : 1) / 48)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 48).toString().indexOf('.')
                      ? (+(value ? value : 1) / 48).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 48).toString().length
                  )
                  .join('');

              case 'Tbsp':
                return (+(value ? value : 1) / 3)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 3).toString().indexOf('.')
                      ? (+(value ? value : 1) / 3).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 3).toString().length
                  )
                  .join('');

              case 'k.gram':
                return `can't measure`;

              case 'Pound':
                return `can't measure`;

              case 'm.liter':
                return (+(value ? value : 1) / 4.92)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 4.92).toString().indexOf('.')
                      ? (+(value ? value : 1) / 4.92).toString().indexOf('.') +
                          3
                      : (+(value ? value : 1) / 4.92).toString().length
                  )
                  .join('');

              case 'Oz':
                return (+(value ? value : 1) * 1.5)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 1.5).toString().indexOf('.')
                      ? (+(value ? value : 1) * 1.5).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 1.5).toString().length
                  )
                  .join('');

              default:
                return `can't measure`;
            }
            break;
          case 'Gal':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) * 4)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 4).toString().indexOf('.')
                      ? (+(value ? value : 1) / 4).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 4).toString().length
                  )
                  .join('');

              case 'Tsp':
                return (+(value ? value : 1) * 768)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 768).toString().indexOf('.')
                      ? (+(value ? value : 1) / 768).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 768).toString().length
                  )
                  .join('');

              case 'Pint':
                return (+(value ? value : 1) * 8)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 8).toString().indexOf('.')
                      ? (+(value ? value : 1) / 8).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 8).toString().length
                  )
                  .join('');

              case 'Cup':
                return (+(value ? value : 1) * 16)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 16).toString().indexOf('.')
                      ? (+(value ? value : 1) / 16).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 16).toString().length
                  )
                  .join('');

              case 'Tbsp':
                return (+(value ? value : 1) * 256)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 256).toString().indexOf('.')
                      ? (+(value ? value : 1) / 256).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 256).toString().length
                  )
                  .join('');

              case 'k.gram':
                return `can't measure`;

              case 'Pound':
                return `can't measure`;

              case 'm.liter':
                return (+(value ? value : 1) * 3785.41)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 3785.41).toString().indexOf('.')
                      ? (+(value ? value : 1) * 3785.41)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 3785.41).toString().length
                  )
                  .join('');

              case 'Oz':
                return (+(value ? value : 1) * 128)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 128).toString().indexOf('.')
                      ? (+(value ? value : 1) * 128).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 128).toString().length
                  )
                  .join('');

              default:
                return `can't measure`;
            }
            break;
          case 'Pint':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 2).toString().indexOf('.')
                      ? (+(value ? value : 1) / 2).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 2).toString().length
                  )
                  .join('');

              case 'Tsp':
                return (+(value ? value : 1) * 96)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 96).toString().indexOf('.')
                      ? (+(value ? value : 1) * 96).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 96).toString().length
                  )
                  .join('');

              case 'Gal':
                return (+(value ? value : 1) / 8)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 8).toString().indexOf('.')
                      ? (+(value ? value : 1) / 8).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 8).toString().length
                  )
                  .join('');

              case 'Cup':
                return (+(value ? value : 1) * 2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 2).toString().indexOf('.')
                      ? (+(value ? value : 1) * 2).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 2).toString().length
                  )
                  .join('');

              case 'Tbsp':
                return (+(value ? value : 1) * 32)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 32).toString().indexOf('.')
                      ? (+(value ? value : 1) * 32).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 32).toString().length
                  )
                  .join('');

              case 'k.gram':
                return `can't measure`;

              case 'Pound':
                return `can't measure`;

              case 'm.liter':
                return (+(value ? value : 1) * 473.2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 473.2).toString().indexOf('.')
                      ? (+(value ? value : 1) * 473.2).toString().indexOf('.') +
                          3
                      : (+(value ? value : 1) * 473.2).toString().length
                  )
                  .join('');

              case 'Oz':
                return (+(value ? value : 1) * 16)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 16).toString().indexOf('.')
                      ? (+(value ? value : 1) * 16).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 16).toString().length
                  )
                  .join('');

              default:
                return `can't measure`;
            }
            break;
          case 'Cup':
            switch (measurmentTo) {
              case 'Quart':
                return (+(value ? value : 1) / 4)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 4).toString().indexOf('.')
                      ? (+(value ? value : 1) / 4).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 4).toString().length
                  )
                  .join('');

              case 'Tsp':
                return (+(value ? value : 1) * 16 * 16 * 3)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 16 * 16 * 3).toString().indexOf('.')
                      ? (+(value ? value : 1) * 16 * 16 * 3)
                          .toString()
                          .indexOf('.') + 3
                      : (+(value ? value : 1) * 16 * 16 * 3).toString().length
                  )
                  .join('');

              case 'Gal':
                return (+(value ? value : 1) / 16)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 16).toString().indexOf('.')
                      ? (+(value ? value : 1) / 16).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 16).toString().length
                  )
                  .join('');

              case 'Pint':
                return (+(value ? value : 1) / 2)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) / 2).toString().indexOf('.')
                      ? (+(value ? value : 1) / 2).toString().indexOf('.') + 3
                      : (+(value ? value : 1) / 2).toString().length
                  )
                  .join('');

              case 'Tbsp':
                return (+(value ? value : 1) * 16)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 16).toString().indexOf('.')
                      ? (+(value ? value : 1) * 16).toString().indexOf('.') + 3
                      : (+(value ? value : 1) * 16).toString().length
                  )
                  .join('');

              case 'k.gram':
                return `can't measure`;

              case 'Pound':
                return `can't measure`;

              case 'm.liter':
                return (+(value ? value : 1) * 236.6)
                  .toString()
                  .split('')
                  .slice(
                    0,
                    (+(value ? value : 1) * 236.6).toString().indexOf('.')
                      ? (+(value ? value : 1) * 236.6).toString().indexOf('.') +
                          3
                      : (+(value ? value : 1) * 236.6).toString().length
                  )
                  .join('');

              default:
                return `can't measure`;
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
              case 'k.gram':
                break;
              case 'Pound':
                break;
              case 'm.liter':
                break;

              default:
                break;
            }
            break;
          case 'k.gram':
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
              case 'm.liter':
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
              case 'k.gram':
                break;
              case 'm.liter':
                break;

              default:
                break;
            }
            break;
          case 'm.liter':
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
              case 'k.gram':
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
          case 'c.meters':
            switch (measurmentTo) {
              case 'meters':
                return value ? +value / 100 : 1;
                break;
              case 'k.meters':
                return value ? +value / 100000 : 1;
                break;
              case 'inches':
                return value ? +value * 0.3937 : 1;
                break;
              case 'feet':
                return value ? (+value / 100) * 3.2808 : 1;
                break;
              case 'yards':
                return value ? (+value / 100) * 1.0936 : 1;
                break;
              default:
                break;
            }
            break;
          case 'meters':
            switch (measurmentTo) {
              case 'c.meters':
                return value ? +value * 100 : 1;
                break;
              case 'k.meters':
                return value ? (+value / 1000) * 3.2808 : 1;
                break;
              case 'inches':
                return value ? +value * 39.37 : 1;
                break;
              case 'feet':
                return value ? +value * 3.2808 : 1;
                break;
              case 'yards':
                return value ? +value * 1.0936 : 1;
                break;
              default:
                break;
            }
            break;
          case 'k.meters':
            switch (measurmentTo) {
              case 'c.meters':
                return value ? +value / 100000 : 1;
                break;
              case 'meters':
                return value ? +value / 1000 : 1;
                break;
              case 'inches':
                return value ? +value * 39374 : 1;
                break;
              case 'feet':
                return value ? +value * 0.003281 : 1;
                break;
              case 'yards':
                return value ? +value * 0.0011 : 1;
                break;
              default:
                break;
            }
            break;
          case 'inches':
            switch (measurmentTo) {
              case 'c.meters':
                return value ? +value / 0.3937 : 1;
                break;
              case 'meters':
                return value ? +value / 100 / 0.3937 : 1;
                break;
              case 'k.meters':
                return value ? +value / 100000 / 0.3937 : 1;
                break;
              case 'feet':
                return value ? +value * 0.083334 : 1;
                break;
              case 'yards':
                return value ? +value * 0.27778 : 1;
                break;
              default:
                break;
            }
            break;
          case 'feet':
            switch (measurmentTo) {
              case 'c.meters':
                return value ? +value * (0.305 / 100) : 1;
                break;
              case 'meters':
                return value ? +value * 0.305 : 1;
                break;
              case 'k.meters':
                return value ? +value * (0.305 / 100000) : 1;
                break;
              case 'inches':
                return value ? +value / 0.3937 : 1;
                break;
              case 'yards':
                return value ? +value / 0.3937 : 1;
                break;
              default:
                break;
            }
            break;
          case 'yards':
            switch (measurmentTo) {
              case 'c.meters':
                break;
              case 'meters':
                break;
              case 'k.meters':
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
