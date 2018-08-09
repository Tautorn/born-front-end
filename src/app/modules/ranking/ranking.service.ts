import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class RankingService {

  public listRanking: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor (private firebase: AngularFireDatabase) {
  }

  public getRanking() {
    this.firebase
      .list('ranking')
      .valueChanges()
      .subscribe(value => {
        this.listRanking.next(this.sortByScore(value));
      });
  }

  private sortByScore(value) {
    return value.sort((internA, internB) => {
      if (internA.score < internB.score) {
        return -1;
      }
      if (internA.score > internB.score) {
        return 1;
      }
      return 0;
    }).reverse();
  }

}
