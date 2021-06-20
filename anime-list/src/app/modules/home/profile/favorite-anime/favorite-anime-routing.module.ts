import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteAnimePage } from './favorite-anime.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteAnimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteAnimePageRoutingModule {}
