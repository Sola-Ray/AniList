import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteMangaPage } from './favorite-manga.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteMangaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteMangaPageRoutingModule {}
