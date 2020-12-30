import { Injectable } from '@angular/core';

//import { HttpClient } from  '@angular/common/http';

//import  'rxjs/add/operator/catch';
//import  'rxjs/add/operator/map';

import { Observable } from 'rxjs';

const BASE_URL : string = "https://launchpad.binance.com"
const LAUNCH_POOL_URL : string = BASE_URL + "/en/tab3";
const API_GETPRICE_URL : string = "https://api1.binance.com/api/v3/ticker/price?symbol=";
const URL_LAUNCHPOOL_DETAIL : string = "https://launchpad.binance.com/gateway-api/v1/public/launchpool/project/detail?projectId=";


const REFRESH_INTERVALS = {
  ASSET : 500,
  LAUNCH_POOL_DETAIL : 3000,
  LAUNCH_POOL_LIST : 60000
}
@Injectable({
  providedIn: 'root'
})

export class LaunchPoolService {

  constructor() { 
  }

  getObservableAssetUSDValue (assetSymbol : string) : Observable<number>{
    return new Observable((observer) => {
      setInterval(() => { this.getAssetUSDValue(assetSymbol)
              .then((newUSDValue) => {
                observer.next(newUSDValue);
              }).catch()}, REFRESH_INTERVALS.ASSET);

    });

  }

  //Get Assets value using http request
  getAssetUSDValue(assetSymbol : string) : Promise<number> {
    return new Promise(function (success,failure){
      try {
        success(Math.floor(Math.random() * Math.floor(100))); //TODO : http request
      } catch (err) {
        failure (err);
      } 
    });
  }

  // getObservableLaunchPoolList () : Observable<LaunchPool[]>{
  //   return new Observable ((observer) => {
  //     setInterval(() => { this.getLaunchPoolList()
  //       .then((newLaunchPoolList) => {
  //         observer.next(newLaunchPoolList);
  //       }).catch()}, REFRESH_INTERVALS.LAUNCH_POOL_LIST);
  //   });
  // }

  getLaunchPoolUrl () : Promise<LaunchPool[]> {
    return new Promise (function (success, failure) {
      try {
        success([
          {
            url : "https://launchpad.binance.com/en//launchpool/OG_BNB",
            stackedAsset : {
              name : "BNB",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            earnedAsset : {
              name : "OG",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            totalPoolReward : Math.floor(Math.random() * Math.floor(10000)),
            totalPoolStacked : Math.floor(Math.random() * Math.floor(10000)),
            ROI : Math.floor(Math.random() * Math.floor(100)),
            USDInvested : null
          }, 
          {
            url : "https://launchpad.binance.com/en//launchpool/OG_CHZ",
            stackedAsset : {
              name : "CHZ",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            earnedAsset : {
              name : "OG",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            totalPoolReward : Math.floor(Math.random() * Math.floor(10000)),
            totalPoolStacked : Math.floor(Math.random() * Math.floor(10000)),
            ROI : Math.floor(Math.random() * Math.floor(100)),
            USDInvested : null
          },
          {
            url : "https://launchpad.binance.com/en//launchpool/OG_BUSD",
            stackedAsset : {
              name : "BUSD",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            earnedAsset : {
              name : "OG",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            totalPoolReward : Math.floor(Math.random() * Math.floor(10000)),
            totalPoolStacked : Math.floor(Math.random() * Math.floor(10000)),
            ROI : Math.floor(Math.random() * Math.floor(100)),
            USDInvested : null
          }, 
          {
            url : "https://launchpad.binance.com/en//launchpool/ATM_BNB",
            stackedAsset : {
              name : "BNB",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            earnedAsset : {
              name : "ATM",
              USDValue : Math.floor(Math.random() * Math.floor(100)),
              imageUrl : ""
            },
            totalPoolReward : Math.floor(Math.random() * Math.floor(10000)),
            totalPoolStacked : Math.floor(Math.random() * Math.floor(10000)),
            ROI : Math.floor(Math.random() * Math.floor(100)),
            USDInvested : null
          },  
      ]);
      }catch(err){
        failure(err);
      }
    });
  }
}
