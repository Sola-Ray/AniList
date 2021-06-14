import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimeDetailPageRoutingModule } from './anime-detail-routing.module';

import { AnimeDetailPage } from './anime-detail.page';
import {AnimeCardComponent} from '../component/anime-card/anime-card.component';
import {FilterAnimeModalComponent} from '../component/filter-anime-modal/filter-anime-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimeDetailPageRoutingModule
  ],
  declarations: [AnimeDetailPage, AnimeCardComponent, FilterAnimeModalComponent]
})
export class AnimeDetailPageModule {}
