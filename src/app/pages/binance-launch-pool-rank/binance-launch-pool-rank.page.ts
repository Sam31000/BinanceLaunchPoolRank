import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { LaunchPoolService } from 'src/app/serivces/launch-pool/launch-pool.service';

@Component({
  selector: 'app-binance-launch-pool-rank',
  templateUrl: './binance-launch-pool-rank.page.html',
  styleUrls: ['./binance-launch-pool-rank.page.scss'],
})
export class BinanceLaunchPoolRankPage implements OnInit {

  investValue: number = 100.00;
  launchPools: any;

  constructor(private _launchPoolService : LaunchPoolService) {
  }

  async ngOnInit() {
    //Get launchPools urls listed on Binance
    this.launchPools = await this._launchPoolService.getLaunchPoolUrl();
  }
}
