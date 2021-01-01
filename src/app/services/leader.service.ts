import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import {HttpClient, HttpHeaders} from  '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {baseUrl} from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }




  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseUrl + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseUrl + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }


}