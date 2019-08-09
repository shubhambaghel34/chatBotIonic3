import { HttpClient,HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';
// import {Data} from '../../../Data';
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
 
  


 

}
