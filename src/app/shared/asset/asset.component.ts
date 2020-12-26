import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})
export class AssetComponent implements OnInit {

  @Input()
  asset : Asset

  constructor() { 
  }

  ngOnInit() {}

}
