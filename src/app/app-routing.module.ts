import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule)
  },
  {
    path:'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(mod => mod.CalendarModule)
  },
  {
    path:'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(mod => mod.ContactsModule)
  },
  {
    path:'music',
    loadChildren: () => import('./music/music.module').then(mod => mod.MusicModule)
  },
  {
    path:'lessons',
    loadChildren: () => import('./tora-lessons/tora-lessons.module').then(mod => mod.ToraLessonsModule)
  },
  {
    path:'',
    component: DashboardComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
