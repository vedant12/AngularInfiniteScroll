import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent },
    { path: 'scroll', component: InfiniteScrollComponent },
];
