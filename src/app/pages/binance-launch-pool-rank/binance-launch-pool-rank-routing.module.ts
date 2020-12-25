import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BinanceLaunchPoolRankPage } from './binance-launch-pool-rank.page';

const routes: Routes = [
  {
    path: '',
    component: BinanceLaunchPoolRankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinanceLaunchPoolRankPageRoutingModule {}
