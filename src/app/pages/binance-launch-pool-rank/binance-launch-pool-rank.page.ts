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
  apiService : APIService;
  launchPoolService : LaunchPoolService;

  constructor(apiService : APIService, launchPoolService : LaunchPoolService) {
    this.apiService = apiService;
    this.launchPoolService = launchPoolService;
  }

  ngOnInit() {
    this.refreshROI();
  }

  async refreshROI(){
    await this.refreshLPData();
    // var response = await fetch("https://www.chiliz.net/api/quote/v1/rates", {
    //   method: 'POST',
    //   body: "",
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'origin' : 'https://www.chiliz.net', 'referer' : 'https://chiliz.net'} });
    // console.log (response);
    // this.LaunchPools.forEach(LP => {
    //   if (LP.earnedAsset != null && 
    //       LP.stackedAsset != null && 
    //       !isNaN(LP.earnedAsset.USDValue) && 
    //       !isNaN(LP.stackedAsset.USDValue)){
    //     var tokenEarnPerStackedAsset = LP.totalPoolReward / LP.totalPoolStacked;
    //     LP.ROI = tokenEarnPerStackedAsset * LP.earnedAsset.USDValue * this.investValue/LP.stackedAsset.USDValue
    //   }
      
    //   //var stackedAssetAmount = this.investValue / LP.stackedAsset.USDValue;
    //   //P.ROI = earnPerStackedAsset * stackedAssetAmount;
    // });
  }

  async refreshLPData(){
    this.launchPoolService.getLaunchPoolUrl().then((results) => { this.launchPools = results});
//    this.LaunchPools = await this.apiService.ListLaunchPools();
  }

  updateInvestValue(event){
    this.refreshROI();
  }
}
