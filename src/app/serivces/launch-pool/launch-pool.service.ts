import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';

const BASE_URL: string = "https://launchpad.binance.com"
const LAUNCH_POOL_URL: string = BASE_URL + "/en/tab3";
const API_GETPRICE_URL: string = "https://api1.binance.com/api/v3/ticker/price?symbol=";
const URL_LAUNCHPOOL_DETAIL: string = "https://launchpad.binance.com/gateway-api/v1/public/launchpool/project/detail?projectId=";

const REFRESH_INTERVALS = {
  ASSET: 500,
  LAUNCH_POOL_DETAIL: 3000,
  LAUNCH_POOL_LIST: 60000
}

@Injectable({
  providedIn: 'root'
})

export class LaunchPoolService {
  
httpOptions : any = {
  headers: new HttpHeaders({})};


  constructor(private http: HttpClient) {
  }

  getObservableAssetUSDValue(assetSymbol: string): Observable<number> {
    return new Observable((observer) => {
      setInterval(() => {
        this.getAssetUSDValue(assetSymbol)
        .then((newUSDValue) => {
          observer.next(newUSDValue);
        }).catch()
      }, REFRESH_INTERVALS.ASSET);

    });

  }

  //Get Assets value using http request
  getAssetUSDValue(assetSymbol: string): Promise<number> {
    return new Promise(function (success, failure) {
      try {
        success(Math.floor(Math.random() * Math.floor(100))); //TODO : http request
      } catch (err) {
        failure(err);
      }
    });
  }

  getObservableLaunchPoolDetail(symbolEarned, symbolStacked){
    return new Observable((observer) => {
      setInterval(() => {
        this.getLaunchPoolHttpGet(symbolEarned, symbolStacked).subscribe(observer)
      }, REFRESH_INTERVALS.LAUNCH_POOL_DETAIL);
    })
  }

  //Perform a HTTP request to Binance to get informations detailed information about launchpool
  getLaunchPoolHttpGet(symbolEarned, symbolStacked) {
    return this.http.get(URL_LAUNCHPOOL_DETAIL + symbolEarned + "_" + symbolStacked, this.httpOptions);
  }

  getLaunchPoolUrl(): Promise<LaunchPool[]> {
    return new Promise(function (success, failure) {
      try {
        success([
          {
            url: "https://launchpad.binance.com/en//launchpool/OG_BNB",
            stackedAsset: {
              name: "BNB",
              USDValue: 0,
              imageUrl: ""
            },
            earnedAsset: {
              name: "OG",
              USDValue: 0,
              imageUrl: ""
            },
            totalPoolReward: 0,
            totalPoolStacked: 0,
            ROI: 0,
            USDInvested: 0
          },
          {
            url: "https://launchpad.binance.com/en//launchpool/OG_CHZ",
            stackedAsset: {
              name: "CHZ",
              USDValue: 0,
              imageUrl: ""
            },
            earnedAsset: {
              name: "OG",
              USDValue: 0,
              imageUrl: ""
            },
            totalPoolReward: 0,
            totalPoolStacked: 0,
            ROI: 0,
            USDInvested: 0
          },
          {
            url: "https://launchpad.binance.com/en//launchpool/OG_BUSD",
            stackedAsset: {
              name: "BUSD",
              USDValue: 0,
              imageUrl: ""
            },
            earnedAsset: {
              name: "OG",
              USDValue: 0,
              imageUrl: ""
            },
            totalPoolReward: 0,
            totalPoolStacked: 0,
            ROI: 0,
            USDInvested: 0
          },
          {
            url: "https://launchpad.binance.com/en//launchpool/ATM_BNB",
            stackedAsset: {
              name: "BNB",
              USDValue: 0,
              imageUrl: ""
            },
            earnedAsset: {
              name: "ATM",
              USDValue: 0,
              imageUrl: ""
            },
            totalPoolReward: 0,
            totalPoolStacked: 0,
            ROI: 0,
            USDInvested: 0
          },
        ]);
      } catch (err) {
        failure(err);
      }
    });
  }
}
