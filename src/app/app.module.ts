import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {FirebaseConfig} from '../environments/firebase.config';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router/src/config';
import {HomeComponent} from './modules/home/home.component';
import {RankingComponent} from './modules/ranking/ranking.component';
import {RankingService} from './modules/ranking/ranking.service';
import {BestScoreManager} from './modules/home/app.storage.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ranking', component: RankingComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RankingComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
  ],
  providers: [RankingService, BestScoreManager],
  bootstrap: [AppComponent]
})
export class AppModule {
}
