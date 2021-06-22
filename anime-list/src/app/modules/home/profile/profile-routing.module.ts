import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: 'animes',
        loadChildren: () => import('./favorite-anime/favorite-anime.module').then( m => m.FavoriteAnimePageModule)
      },
      {
        path: 'mangas',
        loadChildren: () => import('./favorite-manga/favorite-manga.module').then( m => m.FavoriteMangaPageModule)
      }
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
