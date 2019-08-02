import { HttpClient,HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';
import {Data} from '../../../Data';
import { map, catchError, tap } from 'rxjs/operators';
/*
  Generated class for the ProvidersInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class ProvidersInfoProvider {

 
  constructor(public http: HttpClient) {
    console.log('Hello ProvidersInfoProvider Provider');
  }
 
  private extractdata(res: Response){
let body =res;
return body || {};
  }

getInfo(data:Data){

  return this.http.post(url,data,{
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  })

}
 

}
export let url='https://int-api.ihg.com/availability/v2/hotels/offers?fieldset=rateDetails,rateDetails.policies,rateDetails.bonusRates'
// export let opt={
//   headers: new HttpHeaders({
//     'content-type': 'application/json'
//   })
//   };
