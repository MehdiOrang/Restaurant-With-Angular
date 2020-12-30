import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from  '../shared/dish';
import {DishService} from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  errMess: string;
  dishes : Dish[];
  selectedDish : Dish;

  constructor(private disheService:DishService,
    @Inject('baseURl') private baseURL) { }

  ngOnInit(): void {
   this.disheService.getDishes()
   .subscribe(dishes => this.dishes = dishes,
     errmess => this.errMess = <any>errmess);
  }

  onSelect(dish:Dish){
    this.selectedDish = dish
  }

}
