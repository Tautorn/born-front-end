import { Component, OnInit } from '@angular/core';
import {RankingService} from './ranking.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  public listRanking: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

  constructor(private rankingService: RankingService) {
    this.rankingService.getRanking();
    this.listRanking = this.rankingService.listRanking;
  }

}
