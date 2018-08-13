import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class RankingService {

  public listRanking: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public userScore: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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

  public findByName(name: string) {
    this.firebase
      .list('ranking/' + name.toUpperCase())
      .valueChanges()
      .subscribe(value => {
        if (value && value.length > 0 && value[1]) {
          const valueFirebase: number = Number.parseInt(value[1].toString(), 10);
          this.userScore.next(valueFirebase);
        }
      });
  }

  public setNewScore(name: string, newScore: number) {
    if (this.userScore.getValue() >= 0 && newScore > this.userScore.getValue()) {
      const objStore = {
        'score': newScore,
        'name': name.toUpperCase()
      };
      this.firebase
        .list('ranking')
        .set(name.toUpperCase(), objStore);
    }
  }

}
