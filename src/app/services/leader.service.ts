import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import {map} from 'rxjs/operators';
import {baseUrl} from '../shared/baseurl';
import {HttpClient} from  '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }



  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl+'leadership')
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseUrl+'leadership/'+id)
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseUrl+'leadership?featured=true').pipe(map(leaders=>leaders[0]));
  }
}