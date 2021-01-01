import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';

import {HttpClient, HttpHeaders} from  '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {baseUrl} from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseUrl+'promotions').pipe(catchError(this.processHTTPMsgService.handleError));
  }
    

  

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl+'promotions/'+id).pipe(catchError(this.processHTTPMsgService.handleError));
  

  }

  getFeaturedPromotion(): Observable<Promotion> {
      // Simulate server latency with 2 second delay
      return this.http.get<Promotion[]>(baseUrl+'promotions?featured=true').pipe(map(leaders=>leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
