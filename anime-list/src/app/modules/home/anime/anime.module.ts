import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimePageRoutingModule } from './anime-routing.module';

import { AnimePage } from './anime.page';
import {AnimeCardComponent} from './component/anime-card/anime-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AnimePageRoutingModule
    ],
    exports: [
        AnimePage
    ],
  declarations: [AnimePage, AnimeCardComponent]
})
export class AnimePageModule {}
