import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaDetailPage } from './manga-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MangaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaDetailPageRoutingModule {}
