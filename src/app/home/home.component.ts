import { Component, OnInit ,Inject} from '@angular/core';

import {Dish} from  '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  errMess: string;
  promo:Promotion;
  dish:Dish;
  leader:Leader;
  constructor(private dishservice: DishService, private promotionService:PromotionService,private leaderservice:LeaderService, @Inject('baseURl') private baseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promo => this.promo = promo);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }



}
