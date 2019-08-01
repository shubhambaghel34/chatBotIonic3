import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import{Constants} from '../../constants/constants';
/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class ChatMessage {
   message: string;
   userName: string;
  
  }

export class UserInfo {
 id:string;
  name?: string;
}




@Injectable()
export class ChatserviceProvider {
  objdata: any = [];
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
  
    const msgListUrl = Constants.API_URL;
    var promise = new Promise((resolve, reject) => {
      this.http.post(msgListUrl, { query: msg.message }).subscribe((response) => {
        resolve(response);
      });
    });
    return promise;
  }


 


}









