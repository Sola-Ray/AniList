import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteMangaPageRoutingModule } from './favorite-manga-routing.module';

import { FavoriteMangaPage } from './favorite-manga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteMangaPageRoutingModule
  ],
  declarations: [FavoriteMangaPage]
})
export class FavoriteMangaPageModule {}
