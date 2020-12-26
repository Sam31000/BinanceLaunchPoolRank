import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';

@Component({
  selector: 'app-binance-launch-pool-rank',
  templateUrl: './binance-launch-pool-rank.page.html',
  styleUrls: ['./binance-launch-pool-rank.page.scss'],
})
export class BinanceLaunchPoolRankPage implements OnInit {

  investValue: number = 100.00;
  LaunchPools: any;
  apiService : APIService;

  constructor(apiService : APIService) {
    this.apiService = apiService;
  }

  ngOnInit() {
    this.refreshROI();
  }

  async refreshROI(){
    await this.refreshLPData();
    this.LaunchPools.forEach(LP => {
      LP.USDInvested = this.investValue;
      var earnPerStackedAsset = LP.totalPoolReward / LP.totalPoolStacked;
      var stackedAssetAmount = this.investValue / LP.stakedAsset.USDValue;
      LP.ROI = earnPerStackedAsset * stackedAssetAmount;
    });
  }

  async refreshLPData(){
    this.LaunchPools = await this.apiService.ListLaunchPools();
  }

  updateInvestValue(event){
    this.refreshROI();
  }
}
