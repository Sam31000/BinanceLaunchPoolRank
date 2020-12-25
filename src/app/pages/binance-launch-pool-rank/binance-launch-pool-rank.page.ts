import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binance-launch-pool-rank',
  templateUrl: './binance-launch-pool-rank.page.html',
  styleUrls: ['./binance-launch-pool-rank.page.scss'],
})
export class BinanceLaunchPoolRankPage implements OnInit {

  launchPoolTest: LaunchPool
  asset1: Asset
  asset2: Asset
  LaunchPools: Array<LaunchPool>;
  displayedColumns: string[]

  constructor() {

    //Data testing
    this.LaunchPools = [{
      ROI: 231,
      USDInvested: 100,
      earnedAsset: {
        USDValue: 0.000020,
        name: "BNB",
        imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/550eda20-1b9a-4bc7-9a65-e4a329e8bb57.png"
      },
      stakedAsset: {
        USDValue: 10,
        name: "CHZ",
        imageUrl: "https://bin.bnbstatic.com/images/20191211/721a863b-5c9d-4061-a2f0-d288dcd3d1ad.png"
      },
      url: "http://google.fr",
    },
    {
      ROI: 321,
      USDInvested: 100,
      earnedAsset: {
        USDValue: 0.123,
        name: "BTC",
        imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/87496d50-2408-43e1-ad4c-78b47b448a6a.png"
      },
      stakedAsset: {
        USDValue: 10,
        name: "SOL",
        imageUrl: "https://bin.bnbstatic.com/images/20200410/6caae4f1-f4c6-4486-b05b-442dd559f51f.jpg"
      },
      url: "http://google.fr",
    },
    {
      ROI: 12,
      USDInvested: 31,
      earnedAsset: {
        USDValue: 0.123,
        name: "BAT",
        imageUrl: "https://bin.bnbstatic.com/images/20191211/b87dedcf-edaa-4069-bfad-de7f88d7204e.png"
      },
      stakedAsset: {
        USDValue: 140,
        name: "USDC",
        imageUrl: "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/4cf7d633-92fb-4d37-80ed-458c7d1ea410.png"
      },
      url: "http://google.fr",
    },
    ]

    this.displayedColumns = ['ROI', 'earnedAssetUSDValue', 'earnedAssetName', 'earnedAssetimg'];

  }
  ngOnInit() {
  }
}
