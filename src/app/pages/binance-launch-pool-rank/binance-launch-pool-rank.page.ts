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
      imageUrl : "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/550eda20-1b9a-4bc7-9a65-e4a329e8bb57.png"
    }

    this.asset2 = {
      USDValue : 10,
      name : "CHZ",
      imageUrl : "https://bin.bnbstatic.com/images/20191211/721a863b-5c9d-4061-a2f0-d288dcd3d1ad.png"
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
