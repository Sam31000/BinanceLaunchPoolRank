import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { APIService } from 'src/app/API.service';
const cheerio = require('cheerio');

const BASE_URL: string = "https://launchpad.binance.com"
const LAUNCH_POOL_URL: string = BASE_URL + "/en/tab3";
const API_GETPRICE_URL: string = "https://api1.binance.com/api/v3/ticker/price?symbol=";
const URL_LAUNCHPOOL_DETAIL: string = "https://launchpad.binance.com/gateway-api/v1/public/launchpool/project/detail?projectId=";

const REFRESH_INTERVALS = {
  ASSET: 60000,
  LAUNCH_POOL_DETAIL: 60000,
  LAUNCH_POOL_LIST: 60000
}

@Injectable({
  providedIn: 'root'
})

export class LaunchPoolService {

  httpOptions: any = {
    headers: new HttpHeaders({})
  };


  constructor(private http: HttpClient,
    private apiService: APIService) {
  }

  getObservableAssetUSDValue(assetSymbol: string): Observable<number> {
    return new Observable((observer) => {

      //First call before interval
      this.getAssetUSDValue(assetSymbol)
        .then((newUSDValue) => {
          observer.next(newUSDValue);
        }).catch();

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
    return new Promise((success, failure) => {
      try {
        this.apiService.GetAssetUsdtValue(assetSymbol).then((result) => { success(result) });
      } catch (err) {
        failure(err);
      }
    });
  }

  //Retreive stacked and reward pools
  getObservableLaunchPoolDetail(symbolEarned, symbolStacked) {
    return new Observable((observer) => {

      //First call before setting interval
      this.getLaunchPoolHttpGet(symbolEarned, symbolStacked).toPromise().then((result) => {
        observer.next(result);
      })

      setInterval(() => {
        this.getLaunchPoolHttpGet(symbolEarned, symbolStacked).toPromise().then((result) => {
          observer.next(result);
        })
      }, REFRESH_INTERVALS.LAUNCH_POOL_DETAIL);
    })
  }

  //Perform a HTTP request to Binance to get informations detailed information about launchpool
  getLaunchPoolHttpGet(symbolEarned, symbolStacked) {
    return this.http.get(URL_LAUNCHPOOL_DETAIL + symbolStacked + "_" + symbolEarned, this.httpOptions);
  }

  getLaunchPoolUrl(): Promise<any> {
    return new Promise((success, failure) => {
      try {
        this.apiService.ListLaunchPools().then((result) => { success(result) });
      } catch (error) {
        console.error("Error while retriving LaunchPoolList : ", error);
        failure("Error detected");
      }
    });
  }

}
