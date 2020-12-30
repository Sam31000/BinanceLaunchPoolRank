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

  @Input()
  investValue: number

  constructor(private launchPoolService: LaunchPoolService) {
  }

  ngOnInit() {
    var pair = this.launchPool.url.split('/').pop().split("_");

    this.launchPool.stackedAsset = {
      name: pair[0],
      USDValue: 0,
      imageUrl: ""
    }

    this.launchPool.earnedAsset = {
      name: pair[1],
      USDValue: 0,
      imageUrl: ""
    }

    this.launchPoolService.getObservableLaunchPoolDetail(this.launchPool.stackedAsset.name, this.launchPool.earnedAsset.name).subscribe({
      next: (launchPoolDetail: any) => {
        this.launchPool.totalPoolReward = launchPoolDetail.data.todayRebateCoins;
        this.launchPool.totalPoolStacked = launchPoolDetail.data.totalInvestAmount;
        var tokenEarnPerStackedAsset = this.launchPool.totalPoolReward / this.launchPool.totalPoolStacked;
        this.launchPool.ROI = tokenEarnPerStackedAsset * this.launchPool.earnedAsset.USDValue * this.investValue / this.launchPool.stackedAsset.USDValue;
      }
    });
  }

}
