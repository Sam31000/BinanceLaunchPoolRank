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

        switch (this.launchPool.earnedAsset.name + '_' + this.launchPool.stackedAsset.name) {
          case 'BTCST_BUSD':
            this.launchPool.totalPoolReward = 500;
            break;
          case 'BTCST_BTC':
            this.launchPool.totalPoolReward = 1500;
            break;
          case 'BTCST_BNB':
            this.launchPool.totalPoolReward = 3000;
            break;
          default:
            this.launchPool.totalPoolReward = launchPoolDetail.data.todayRebateCoins;
        }
        this.launchPool.totalPoolStacked = launchPoolDetail.data.totalInvestAmount;
        this.refreshROI();
      }
    });
  }

  refreshROI() {
    //ROI is calculated only if there is enough data
    if (this.launchPool &&
      this.launchPool.totalPoolReward && this.launchPool.totalPoolReward != 0 &&
      this.launchPool.totalPoolStacked && this.launchPool.totalPoolStacked != 0 &&
      this.launchPool.earnedAsset &&
      this.launchPool.earnedAsset.USDValue &&
      this.launchPool.stackedAsset &&
      this.launchPool.earnedAsset.USDValue && this.launchPool.stackedAsset.USDValue != 0
    ) {

      if (this.launchPool.earnedAsset.name == 'UNFI')
        console.log('Launchpool : ', this.launchPool);

      var tokenEarnPerStackedAsset = this.launchPool.totalPoolReward / this.launchPool.totalPoolStacked;
      this.launchPool.ROI = tokenEarnPerStackedAsset * this.launchPool.earnedAsset.USDValue * this._investValue / this.launchPool.stackedAsset.USDValue;
    }
    else
      this.launchPool.ROI = 0;
  }


}
