import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-launch-pool',
  templateUrl: './launch-pool.component.html',
  styleUrls: ['./launch-pool.component.scss'],
})



export class LaunchPoolComponent implements OnInit {


  @Input()
  launchPool : LaunchPool

  constructor() { }

  ngOnInit() {
  }

}
