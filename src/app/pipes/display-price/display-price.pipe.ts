import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayLoadedNumberPipe'
})
export class DisplayLoadedNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null || isNaN(value))
      return "???";
    
    return value;
  }

}
