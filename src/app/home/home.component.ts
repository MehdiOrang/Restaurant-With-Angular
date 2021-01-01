import { Component, OnInit ,Inject} from '@angular/core';

import {Dish} from  '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  errMess: string;
  promo:Promotion;
  dish:Dish;
  leader:Leader;
  constructor(private dishservice: DishService, private promotionService:PromotionService,private leaderservice:LeaderService, @Inject('baseURl') private baseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturedPromotion().subscribe(promo => this.promo = promo, errmess => this.errMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.errMess = <any>errmess);
  }



}
