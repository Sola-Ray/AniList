import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimePage } from './anime.page';

const routes: Routes = [
  {
    path: '',
    component: AnimePage
  },
  {
    path: ':id',
    loadChildren: () => import('./anime-detail/anime-detail.module').then( m => m.AnimeDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimePageRoutingModule {}
