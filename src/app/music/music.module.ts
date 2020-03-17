import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MusicRoutingModule } from './music-routing.module';



@NgModule({
  declarations: [MusicPlayerComponent],
  imports: [
    SharedModule,
    MusicRoutingModule
  ]
})
export class MusicModule { }
