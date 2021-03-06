import { Injectable } from '@angular/core';
import {Feedback} from '../shared/feedback';

import {Observable} from 'rxjs';
import {baseUrl} from '../shared/baseurl';

import {HttpClient, HttpHeaders} from  '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseUrl + 'feedback', feedback, httpOptions);
  }
}
