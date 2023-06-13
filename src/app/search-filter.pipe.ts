import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any, ...args: any[]) {
    console.log(list)
    console.log(args)
    let tempArr = []
    if (args[0] !== '') {
      list.map(l => {
        let cards = [];
        l.cards.map(c => {
          if (
              (
                  ((c.header.toUpperCase()).indexOf(args[0].toUpperCase()) !== -1 ||
              (c.summary.toUpperCase()).indexOf(args[0].toUpperCase()) !== -1)) &&
              (args[2] !== 'Priority' ? c.priority.toUpperCase()===args[2].toUpperCase(): true) &&
              (args[1] !== 'Status' ? c.status.toUpperCase()===args[1].toUpperCase(): true)
          ) {
            cards.push(c);
          }
          return c
        })
        tempArr.push({
          ...l,
          cards: cards
        })
        return l
      })
      console.log(tempArr)
      return tempArr
    }
    else {
      return list
    }
  }

}
