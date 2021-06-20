import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteAnimePageRoutingModule } from './favorite-anime-routing.module';

import { FavoriteAnimePage } from './favorite-anime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteAnimePageRoutingModule
  ],
  declarations: [FavoriteAnimePage]
})
export class FavoriteAnimePageModule {}
