import { Component, OnInit,Inject } from '@angular/core';
import {Leader} from  '../shared/leader';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  leaders : Leader[];
  selectedLeader : Leader;

  constructor(private leaderservice:LeaderService, @Inject('baseURl') private baseURL) { }

  ngOnInit(): void {
    this.leaderservice.getLeaders().subscribe(leaders=> this.leaders = leaders);;

  }

}
