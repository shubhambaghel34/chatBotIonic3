import { Weather, ResultEntity, Responsedto } from './../../interface/weather';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../constants/constants';
import { Hotelsdetails } from '../../interface/HotelsDetails';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
  message: string;
  userName: string;
  useravatar: string;
  cardview?: boolean;
}

export class UserInfo {
  id: string;
  name?: string;
}


@Injectable()
export class ChatserviceProvider {
  public dataUrl: string = "assets/Json/data.json";
  objdata: any = [];
  isloading: boolean;
  baseUrl: any = "/v2/";
  hotelUrl: any = this.baseUrl + "hotels/offers";
  public data = {
    startDate: "2019-08-10",
    endDate: "2019-08-11",
    hotelMnemonics: ["ATLBH"]
  };

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: "",
      name: "User"
    };
    return new Promise(resolve => resolve(userInfo));
  }
  constructor(public http: HttpClient, private events: Events) {
    console.log("Hello ChatserviceProvider ");
   
  }


  
  sendMsg(msg: ChatMessage) {
    this.isloading = true;
    const msgListUrl = "http://demo7806966.mockable.io/api";
    var promise = new Promise((resolve, _reject) => {
      this.http.post(msgListUrl, { query: msg.message }).subscribe(response => {
        resolve(response);
      });
    });
    return promise;
  }

  public headerdata = new HttpHeaders({
    "Content-Type": "application/json",
    "X-IHG-API-KEY": "Ym5gIH17Fe7WcF9J3gHbtAyoeusJpO2q"
  });
  public params = new HttpParams().set(
    "fieldset",
    "rateDetails,rateDetails.policies,rateDetails.bonusRates"
  );

  httpOptions = {
    headers: this.headerdata,
    params: this.params
  };

  public getHotels(postobject: any): Promise<any> {
    return this.http
      .post(Constants.IHG_URL, postobject, {
        headers: this.headerdata,
        params: this.params
      })
      .toPromise()
      .then(response => {
        console.log("responseData", response);
        return (response = response);
      })
     .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.log(error, error.message);
     return Promise.reject(error.message || error);
   }
 
   getData(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.dataUrl);
    
 }



}























