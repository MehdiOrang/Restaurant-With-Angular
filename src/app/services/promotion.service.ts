import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';

import {map} from 'rxjs/operators';
import {baseUrl} from '../shared/baseurl';
import {HttpClient} from  '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseUrl+'promotions')

  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl+'promotions/'+id)

  }

  getFeaturedPromotion(): Observable<Promotion> {
      // Simulate server latency with 2 second delay
      return this.http.get<Promotion[]>(baseUrl+'promotions?featured=true').pipe(map(leaders=>leaders[0]));
  }
}
