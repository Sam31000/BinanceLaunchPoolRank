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
  LAUNCH_POOL : 60000
}
@Injectable({
  providedIn: 'root'
})

export class LaunchPoolService {

  constructor() { 
  }

  getObservableAssetUSDValue (assetSymbol : string) : Observable<number>{
    return new Observable((observer) => {
      this.getAssetUSDValue(assetSymbol)
      .then(assetValue => {
        setInterval(() => observer.next(assetValue), REFRESH_INTERVALS.ASSET);
      })
      .catch(err => { observer.error(err) })
    });

  }

  getAssetUSDValue(assetSymbol : string) : Promise<number> {
    return new Promise(function (success,failure){
        success(Math.floor(Math.random() * Math.floor(100))); //TODO : http request
    });
  }


  // getLaunchPoolAvailable() : Observable<LaunchPool> {
  //   return this.httpClient.get(LAUNCH_POOL_URL).map(products  => {

  //     return  products.map((product) =>  new  Product(product));
      
  //     })
      
  //     .catch((err)=>{
      
  //     console.error(err);
      
  //     });
  // }
}
