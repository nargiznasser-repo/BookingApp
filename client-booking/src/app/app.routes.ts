import { Routes } from '@angular/router';
import { SeatlayoutComponent } from './seatlayout/seatlayout.component';

export const routes: Routes = [
    { path: 'seats', component: SeatlayoutComponent },
    {path: '', redirectTo: 'seats', pathMatch: 'full'},
];
