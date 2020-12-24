import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'menu',     component: MenuComponent },
    {path:'contact',  component: ContactComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];