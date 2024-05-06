import { Pipe, PipeTransform } from '@angular/core';
import { Gtag } from 'angular-gtag';
import { DataSavingService } from '../services/dataSaving.service';

@Pipe({
  name: 'measurments',
})
export class MeasurmentsPipe implements PipeTransform {
  tmpValue: any = '';
  maxAmout: any = 10000;
  lastmeasurement: any = [];

  constructor(private gtag: Gtag, private dataSavingSrv: DataSavingService) {}
  transform(
    value: string | null | undefined,
    topic: string,
    measureFrom: string | null | undefined,
    measurmentTo: string,
    Density: string
  ): unknown {
    if (!(topic && measureFrom && measurmentTo)) return null;
    let fixedNum = 2;
    this.gtag.event('measureEvent', {
      app_name: 'SmartestAppes',
      screen_name: 'Measurments Page',
      topic: topic,
      measureFrom: measureFrom,
      measureTo: measurmentTo,
      Density: Density,
    });
    switch (topic) {
      case 'Kitchen':
        switch (measureFrom) {
          case 'quart':
            switch (measurmentTo) {
              case 'teaspoons':
                this.tmpValue = (
                  +(value ? value : 1) *
                  0.95 *
                  1000 *
                  0.2
                ).toFixed(fixedNum);
                break;
              case 'gallon':
                this.tmpValue = (+(value ? value : 1) * 0.25).toFixed(fixedNum);
                break;
              case 'pint':
                this.tmpValue = (+(value ? value : 1) * 2).toFixed(fixedNum);
                break;
              case 'cup':
                this.tmpValue = (+(value ? value : 1) * 4).toFixed(fixedNum);
                break;
              case 'tablespoons':
                this.tmpValue = (
                  +(value ? value : 1) *
                  0.95 *
                  1000 *
                  0.06
                ).toFixed(fixedNum);
                break;
              case 'kilogram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 0.95 * +Density).toFixed(fixedNum)
                  : 'Choose Density';
                break;
              case 'gram':
                this.tmpValue = Density
                  ? ((+(value ? value : 1) * 0.95 * +Density) / 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;
              case 'milligram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 0.95 * +Density * 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;
              case 'pound':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 0.95 * +Density * 2.204).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;
              case 'milliliter':
                this.tmpValue = (+(value ? value : 1) * 0.95 * 1000).toFixed(
                  fixedNum
                );
                break;
              case 'liter':
                this.tmpValue = (+(value ? value : 1) * 0.95).toFixed(fixedNum);
                break;
              case 'Oz':
                this.tmpValue = (+(value ? value : 1) * 8 * 2 * 2 * 4).toFixed(
                  fixedNum
                );
                break;
              default:
                this.tmpValue = "Can't Measure";
            }
            break;
          case 'teaspoons':
            switch (measurmentTo) {
              case 'quart':
                this.tmpValue = (+(value ? value : 1) / 192).toFixed(fixedNum);
                break;
              case 'gallon':
                this.tmpValue = (+(value ? value : 1) / 768).toFixed(fixedNum);
                break;
              case 'pint':
                this.tmpValue = (+(value ? value : 1) / 96).toFixed(fixedNum);
                break;

              case 'cup':
                this.tmpValue = (+(value ? value : 1) / 48).toFixed(fixedNum);
                break;

              case 'tablespoons':
                this.tmpValue = (+(value ? value : 1) / 3).toFixed(fixedNum);
                break;

              case 'kilogram':
                this.tmpValue = Density
                  ? ((+(value ? value : 1) * 4.92 * +Density) / 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'gram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 4.92 * +Density).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 4.92 * +Density * 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 0.00492).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'pound':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 2.204 * 0.00492).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'milliliter':
                this.tmpValue = (+(value ? value : 1) / 4.92).toFixed(fixedNum);
                break;

              case 'Oz':
                this.tmpValue = (+(value ? value : 1) * 1.5).toFixed(fixedNum);
                break;

              default:
                this.tmpValue = "Can't Measure";
            }
            break;
          case 'gallon':
            switch (measurmentTo) {
              case 'quart':
                this.tmpValue = (+(value ? value : 1) * 4).toFixed(fixedNum);
                break;

              case 'teaspoons':
                this.tmpValue = (+(value ? value : 1) * 768).toFixed(fixedNum);
                break;

              case 'pint':
                this.tmpValue = (+(value ? value : 1) * 8).toFixed(fixedNum);
                break;

              case 'cup':
                this.tmpValue = (+(value ? value : 1) * 16).toFixed(fixedNum);
                break;

              case 'tablespoons':
                this.tmpValue = (+(value ? value : 1) * 256).toFixed(fixedNum);
                break;

              case 'kilogram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 3.78541 * +Density).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'gram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 3.78541 * +Density * 1000).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density
                  ? (
                      +(value ? value : 1) *
                      3.78541 *
                      +Density *
                      1000000
                    ).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 3.78541).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'pound':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 3.78541 * 2.204 * +Density).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'milliliter':
                this.tmpValue = (+(value ? value : 1) * 3785.41).toFixed(
                  fixedNum
                );
                break;

              case 'Oz':
                this.tmpValue = (+(value ? value : 1) * 128).toFixed(fixedNum);
                break;

              default:
                this.tmpValue = "Can't Measure";
            }
            break;
          case 'pint':
            switch (measurmentTo) {
              case 'quart':
                this.tmpValue = (+(value ? value : 1) / 2).toFixed(fixedNum);
                break;

              case 'teaspoons':
                this.tmpValue = (+(value ? value : 1) * 96).toFixed(fixedNum);
                break;

              case 'gallon':
                this.tmpValue = (+(value ? value : 1) / 8).toFixed(fixedNum);
                break;

              case 'cup':
                this.tmpValue = (+(value ? value : 1) * 2).toFixed(fixedNum);
                break;

              case 'tablespoons':
                this.tmpValue = (+(value ? value : 1) * 32).toFixed(fixedNum);
                break;

              case 'kilogram':
                this.tmpValue = Density
                  ? (
                      ((+(value ? value : 1) * 473.2) / 1000) *
                      +Density
                    ).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'gram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 473.2 * +Density).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 473.2 * 1000 * +Density).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density
                  ? ((+(value ? value : 1) * 473.2) / 1000).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'pound':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'milliliter':
                this.tmpValue = (+(value ? value : 1) * 473.2).toFixed(
                  fixedNum
                );
                break;

              case 'Oz':
                this.tmpValue = (+(value ? value : 1) * 16).toFixed(fixedNum);
                break;

              default:
                this.tmpValue = "Can't Measure";
            }
            break;
          case 'cup':
            switch (measurmentTo) {
              case 'quart':
                this.tmpValue = (+(value ? value : 1) / 4).toFixed(fixedNum);
                break;

              case 'teaspoons':
                this.tmpValue = (+(value ? value : 1) * 16 * 16 * 3).toFixed(
                  fixedNum
                );
                break;

              case 'gallon':
                this.tmpValue = (+(value ? value : 1) / 16).toFixed(fixedNum);
                break;

              case 'pint':
                this.tmpValue = (+(value ? value : 1) / 2).toFixed(fixedNum);
                break;

              case 'tablespoons':
                this.tmpValue = (+(value ? value : 1) * 16).toFixed(fixedNum);
                break;

              case 'kilogram':
                this.tmpValue = Density
                  ? (
                      ((+(value ? value : 1) * 236.6) / 1000) *
                      +Density
                    ).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'gram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 236.6 * +Density).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density
                  ? (+(value ? value : 1) * 236.6 * 1000 * +Density).toFixed(
                      fixedNum
                    )
                  : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density
                  ? ((+(value ? value : 1) * 236.6) / 1000).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'pound':
                this.tmpValue = Density
                  ? (
                      ((+(value ? value : 1) * 236.6) / 1000) *
                      2.204 *
                      +Density
                    ).toFixed(fixedNum)
                  : 'Choose Density';
                break;

              case 'milliliter':
                this.tmpValue = (+(value ? value : 1) * 236.6).toFixed(
                  fixedNum
                );
                break;
              default:
                this.tmpValue = "Can't Measure";
            }
            break;
          case 'tablespoons':
            switch (measurmentTo) {
              case 'quart':
                break;
              case 'teaspoons':
                break;
              case 'gallon':
                break;
              case 'pint':
                break;
              case 'cup':
                break;
              case 'kilogram':

              case 'gram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;
              case 'pound':
                break;
              case 'milliliter':
                break;

              default:
                break;
            }
            break;
          case 'kilogram':
            switch (measurmentTo) {
              case 'quart':
                break;
              case 'teaspoons':
                break;
              case 'gallon':
                break;
              case 'pint':
                break;
              case 'cup':
                break;
              case 'tablespoons':
                break;

              case 'gram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;
              case 'pound':
                break;
              case 'milliliter':
                break;

              default:
                break;
            }
            break;
          case 'pound':
            switch (measurmentTo) {
              case 'quart':
                break;
              case 'teaspoons':
                break;
              case 'gallon':
                break;
              case 'pint':
                break;
              case 'cup':
                break;
              case 'tablespoons':
                break;
              case 'kilogram':

              case 'gram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;
                break;
                break;
              case 'milliliter':
                break;

              default:
                break;
            }
            break;
          case 'milliliter':
            switch (measurmentTo) {
              case 'quart':
                break;
              case 'teaspoons':
                break;
              case 'gallon':
                break;
              case 'pint':
                break;
              case 'cup':
                break;
              case 'tablespoons':
                break;
              case 'kilogram':

              case 'gram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'milligram':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;

              case 'liter':
                this.tmpValue = Density ? '' : 'Choose Density';
                break;
              case 'pound':
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
                this.tmpValue = value ? (+value / 100).toFixed(fixedNum) : 1;
                break;
              case 'kilometers':
                this.tmpValue = value ? (+value / 100000).toFixed(fixedNum) : 1;
                break;
              case 'inches':
                this.tmpValue = value ? (+value * 0.3937).toFixed(fixedNum) : 1;
                break;
              case 'feet':
                this.tmpValue = value
                  ? ((+value / 100) * 3.2808).toFixed(fixedNum)
                  : 1;
                break;
              case 'yards':
                this.tmpValue = value
                  ? ((+value / 100) * 1.0936).toFixed(fixedNum)
                  : 1;
                break;
              default:
                break;
            }
            break;
          case 'meters':
            switch (measurmentTo) {
              case 'c-meters':
                this.tmpValue = value ? (+value * 100).toFixed(fixedNum) : 1;
                break;
              case 'kilometers':
                this.tmpValue = value
                  ? ((+value / 1000) * 3.2808).toFixed(fixedNum)
                  : 1;
                break;
              case 'inches':
                this.tmpValue = value ? (+value * 39.37).toFixed(fixedNum) : 1;
                break;
              case 'feet':
                this.tmpValue = value ? (+value * 3.2808).toFixed(fixedNum) : 1;
                break;
              case 'yards':
                this.tmpValue = value ? (+value * 1.0936).toFixed(fixedNum) : 1;
                break;
              default:
                break;
            }
            break;
          case 'kilometers':
            switch (measurmentTo) {
              case 'c-meters':
                this.tmpValue = value ? (+value / 100000).toFixed(fixedNum) : 1;
                break;
              case 'meters':
                this.tmpValue = value ? (+value / 1000).toFixed(fixedNum) : 1;
                break;
              case 'inches':
                this.tmpValue = value ? (+value * 39374).toFixed(fixedNum) : 1;
                break;
              case 'feet':
                this.tmpValue = value
                  ? (+value * 0.003281).toFixed(fixedNum)
                  : 1;
                break;
              case 'yards':
                this.tmpValue = value ? (+value * 0.0011).toFixed(fixedNum) : 1;
                break;
              default:
                break;
            }
            break;
          case 'inches':
            switch (measurmentTo) {
              case 'c-meters':
                this.tmpValue = value ? (+value / 0.3937).toFixed(fixedNum) : 1;
                break;
              case 'meters':
                this.tmpValue = value
                  ? (+value / 100 / 0.3937).toFixed(fixedNum)
                  : 1;
                break;
              case 'kilometers':
                this.tmpValue = value
                  ? (+value / 100000 / 0.3937).toFixed(fixedNum)
                  : 1;
                break;
              case 'feet':
                this.tmpValue = value
                  ? (+value * 0.083334).toFixed(fixedNum)
                  : 1;
                break;
              case 'yards':
                this.tmpValue = value
                  ? (+value * 0.27778).toFixed(fixedNum)
                  : 1;
                break;
              default:
                break;
            }
            break;
          case 'feet':
            switch (measurmentTo) {
              case 'c-meters':
                this.tmpValue = value
                  ? (+value * (0.305 / 100)).toFixed(fixedNum)
                  : 1;
                break;
              case 'meters':
                this.tmpValue = value ? (+value * 0.305).toFixed(fixedNum) : 1;
                break;
              case 'kilometers':
                this.tmpValue = value
                  ? (+value * (0.305 / 100000)).toFixed(fixedNum)
                  : 1;
                break;
              case 'inches':
                this.tmpValue = value ? (+value / 0.3937).toFixed(fixedNum) : 1;
                break;
              case 'yards':
                this.tmpValue = value ? (+value / 0.3937).toFixed(fixedNum) : 1;
                break;
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
              case 'kilometers':
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
    this.lastmeasurement = {
      value: value,
      topic: topic,
      measureFrom: measureFrom,
      measureTo: measurmentTo,
      Density: Density,
      tmpValue: this.tmpValue > this.maxAmout ? 'N/A' : this.tmpValue
    }
    this.dataSavingSrv.setLastMeasurement(this.lastmeasurement)
    return this.tmpValue > this.maxAmout ? 'N/A' : this.tmpValue;
  }
}
