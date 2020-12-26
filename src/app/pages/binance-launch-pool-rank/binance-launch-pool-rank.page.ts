import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-binance-launch-pool-rank',
  templateUrl: './binance-launch-pool-rank.page.html',
  styleUrls: ['./binance-launch-pool-rank.page.scss'],
})
export class BinanceLaunchPoolRankPage implements OnInit {

  launchPoolTest: LaunchPool
  asset1: Asset
  asset2: Asset
  LaunchPools: any;

  constructor(apiService : APIService) {

    //Data testing
    apiService.ListLaunchPools().then((data) => { this.LaunchPools = data});
    
  }
  ngOnInit() {
  }
}
