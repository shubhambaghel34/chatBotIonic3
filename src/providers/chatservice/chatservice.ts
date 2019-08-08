import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Constants } from '../../constants/constants';
import { Hotelsdetails } from '../../interface/HotelsDetails';

/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
  message: string;
  userName: string;
  useravatar: string;
}

export class UserInfo {
  id: string;
  name?: string;
}


@Injectable()
export class ChatserviceProvider {
  objdata: any = [];
  isloading: boolean;
 public data = {
    startDate: '2019-08-10',
    endDate: '2019-08-11',
    hotelMnemonics: ['ATLBH'],
  }
  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '',
      name: 'User',

    };
   return new Promise(resolve => resolve(userInfo));
  }
  constructor(public http: HttpClient, private events: Events) {
    console.log('Hello ChatserviceProvider ');
  }
 
  sendMsg(msg: ChatMessage) {
    this.isloading = true;
    const msgListUrl = 'http://demo7806966.mockable.io/api';
    var promise = new Promise((resolve, _reject) => {
      this.http.post(msgListUrl, { query: msg.message }).subscribe((response) => {
        resolve(response);
      });
    });
    return promise;
  }

  public headerdata = new HttpHeaders({
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json',
    'X-IHG-API-KEY': 'Ym5gIH17Fe7WcF9J3gHbtAyoeusJpO2q',
    'Cache-Control': 'no-cache'
  });
  public params = new HttpParams()
    .set('fieldset', 'rateDetails,rateDetails.policies,rateDetails.bonusRates');

  httpOptions = {
    headers: this.headerdata,
    params: this.params,
    withCredentials: true
  };
  
  Url = 'https://int-api.ihg.com/availability/v2/hotels/offers';

  public getHotels(postobject: any): Promise<any> {
    return this.http.post<Hotelsdetails>(this.Url, postobject, {headers: this.headerdata, params: this.params })
      .toPromise().then(response => {
        return response = response;
      })
    
  }

}


 
 
   
    
  













