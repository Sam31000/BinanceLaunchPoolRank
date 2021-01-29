import { Component, Input, OnInit } from '@angular/core';
import { LaunchPoolService } from 'src/app/serivces/launch-pool/launch-pool.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {

  @Input()
  asset : Asset

  launchPoolService : LaunchPoolService;

  constructor(launchPoolService : LaunchPoolService) {
    this.launchPoolService = launchPoolService;
  }

  ngOnInit() {
    this.launchPoolService.getObservableAssetUSDValue(this.asset.name)
    .subscribe({ next: value => {
      if (value == null){
        value = 1;
      }
      this.asset.USDValue = value;
    } });
  }

}
