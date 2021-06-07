import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MangaService} from '../../../../service/manga.service';
import {Manga} from '../../../../model/Manga';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.page.html',
  styleUrls: ['./manga-detail.page.scss'],
})
export class MangaDetailPage implements OnInit {
  mangaId!: number;
  manga!: Manga;
  constructor(private activeRoute: ActivatedRoute,
              private mangaService: MangaService,
              private location: Location) { }

  ngOnInit() {
    this.mangaId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log(this.mangaId);
    this.mangaService.getManga(this.mangaId).subscribe((result) => {
      this.manga = result.data.Page.media[0];
    })
  }
  return(): void {
    this.location.back();
  }

}
