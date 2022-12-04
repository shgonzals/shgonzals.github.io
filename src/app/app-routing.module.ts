import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [
  { path: '', component: StockComponent},
  { path: 'sentiment/:symbol', component: SentimentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
