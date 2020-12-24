import { Component, OnInit , Input} from '@angular/core';

import {Dish} from  '../shared/dish';
import { Promotion } from '../shared/promotion';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  promo:Promotion;
  dish:Dish;
  constructor(private dishservice: DishService, private promotionService:PromotionService) { }

  ngOnInit(): void {
    this.dish = this.dishservice.getFeaturedDish();
    this.promo = this.promotionService.getFeaturedPromotion();
  }



}
