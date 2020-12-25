import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BinanceLaunchPoolRankPage } from './binance-launch-pool-rank.page';

describe('BinanceLaunchPoolRankPage', () => {
  let component: BinanceLaunchPoolRankPage;
  let fixture: ComponentFixture<BinanceLaunchPoolRankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinanceLaunchPoolRankPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BinanceLaunchPoolRankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
