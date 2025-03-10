import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { ContactusPageComponent } from './contactus-page/contactus-page.component';

export const routes:Routes=[
  {path:'',component:HomePageComponent},
  {path:'home',component:HomePageComponent},
  {path:'aboutus',component:AboutPageComponent},
  {path:'courses',component:CoursesPageComponent},
  {path:'contactus',component:ContactusPageComponent},
  {path:'**',component:HomePageComponent},
];
