import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from '../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
