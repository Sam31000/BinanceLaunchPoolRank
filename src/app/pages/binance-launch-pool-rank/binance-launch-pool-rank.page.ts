import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binance-launch-pool-rank',
  templateUrl: './binance-launch-pool-rank.page.html',
  styleUrls: ['./binance-launch-pool-rank.page.scss'],
})
export class BinanceLaunchPoolRankPage implements OnInit {

  launchPoolTest : LaunchPool
  asset1 : Asset
  asset2 : Asset

  constructor() { }
  ngOnInit() {

    this.asset1 = {
      USDValue : 20,
      name : "BNB",
    }

    this.asset2 = {
      USDValue : 10,
      name : "CHZ",
    }

    this.launchPoolTest = {
      ROI : 231,
      USDInvested : 100,
      earnedAsset : this.asset1,
      rank : 1,
      stakedAsset : this.asset2,
      url : "http://google.fr",
    }
  }

}
