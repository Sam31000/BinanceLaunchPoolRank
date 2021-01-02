import { Component, OnInit, Input } from '@angular/core';
import { LaunchPoolService } from 'src/app/serivces/launch-pool/launch-pool.service';

@Component({
  selector: 'app-launch-pool',
  templateUrl: './launch-pool.component.html',
  styleUrls: ['./launch-pool.component.scss'],
})



export class LaunchPoolComponent implements OnInit {


  @Input()
  launchPool: LaunchPool

  @Input('investValue')
  set investValue(val) {
    this._investValue = val;
    this.refreshROI();
  }


  private _investValue: number;

  constructor(private launchPoolService: LaunchPoolService) {
    setInterval(() => { this.refreshROI(); }, 500);
  }

  ngOnInit() {

    var pair = this.launchPool.url.split('/').pop().split("_");

    this.launchPool.stackedAsset = {
      name: pair[1],
      USDValue: 0,
      imageUrl: ""
    }

    this.launchPool.earnedAsset = {
      name: pair[0],
      USDValue: 0,
      imageUrl: ""
    }

    this.launchPoolService.getObservableLaunchPoolDetail(this.launchPool.stackedAsset.name, this.launchPool.earnedAsset.name).subscribe({
      next: (launchPoolDetail: any) => {
        this.launchPool.totalPoolReward = launchPoolDetail.data.todayRebateCoins;
        this.launchPool.totalPoolStacked = launchPoolDetail.data.totalInvestAmount;
        this.refreshROI();
      }
    });
  }

  refreshROI() {
    if (this.launchPool &&
      this.launchPool.totalPoolReward &&
      this.launchPool.totalPoolStacked &&
      this.launchPool.earnedAsset &&
      this.launchPool.earnedAsset.USDValue &&
      this.launchPool.stackedAsset &&
      this.launchPool.earnedAsset.USDValue
    ) {
      var tokenEarnPerStackedAsset = this.launchPool.totalPoolReward / this.launchPool.totalPoolStacked;
      this.launchPool.ROI = tokenEarnPerStackedAsset * this.launchPool.earnedAsset.USDValue * this._investValue / this.launchPool.stackedAsset.USDValue;
    }
    else
      this.launchPool.ROI = 0;
  }


}
