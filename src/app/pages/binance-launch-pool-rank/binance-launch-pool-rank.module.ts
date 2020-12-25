import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BinanceLaunchPoolRankPageRoutingModule } from './binance-launch-pool-rank-routing.module';

import { BinanceLaunchPoolRankPage } from './binance-launch-pool-rank.page';
import { LaunchPoolComponent } from './launch-pool/launch-pool.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BinanceLaunchPoolRankPageRoutingModule
  ],
  declarations: [BinanceLaunchPoolRankPage, LaunchPoolComponent]
})
export class BinanceLaunchPoolRankPageModule {}
