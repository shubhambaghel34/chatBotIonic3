import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/Rx';
import{Constants} from '../../constants/constants';
import{Headers,RequestOptions} from '@angular/http';


/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
   message: string;
   userName: string;
  useravatar:string;
  }

export class UserInfo {
 id:string;
  name?: string;
}
@Injectable()
export class ChatserviceProvider {
  objdata: any = [];
  isloading :boolean;
  getUserInfo():Promise<UserInfo> {
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
  this.isloading=true;
    const msgListUrl = Constants.API_URL;
    var promise = new Promise((resolve, reject) => {
      this.http.post(msgListUrl, { query: msg.message }).subscribe((response) => {
      this.isloading=false;
        resolve(response);
      },
      error =>{
        console.log(error)
      })
      }); 
    return promise;
  }

 

//   catchData(body:Object):Observable<any> {
    // let bodystring =JSON.stringify(body);
// let headers =new Headers({'Content-Type':'application/json'});
// let options =new RequestOptions({headers:Headers});
// return this.http.post('https://int-api.ihg.com/availability/v2/hotels/offers?fieldset=rateDetails,rateDetails.policies,rateDetails.bonusRates',body,options).pipe(map((res:Response) =>res.json())
// .catch((error:any) => Observable.throw(error.json().error || 'Server error')));
   
//    }
 


}









