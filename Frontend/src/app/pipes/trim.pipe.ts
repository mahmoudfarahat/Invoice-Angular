import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    console.log(value)
    const v = value.replace(/ +/g,'')
    console.log(v)
    return v
  }

}
