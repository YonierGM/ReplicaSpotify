import { Pipe, PipeTransform } from '@angular/core';
import { TracksModel } from '@core/models/tracks.models';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, args: string | null = null, sort: string = 'asc'): TracksModel[] {
    try {

      if(args === null){
        return value

      }else{
        // sort by name

        const tmpList = value.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 1
      });

      // names must be equal
      return (sort === 'asc') ? tmpList : tmpList.reverse()

      }

    } catch (e) {
      console.log('algo pasó')
      return value

    }
  }

}
