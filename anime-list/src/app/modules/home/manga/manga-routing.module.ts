import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaPage } from './manga.page';

const routes: Routes = [
  {
    path: '',
    component: MangaPage
  },
  {
    path: ':id',
    loadChildren: () => import('./manga-detail/manga-detail.module').then(m => m.MangaDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaPageRoutingModule {}
