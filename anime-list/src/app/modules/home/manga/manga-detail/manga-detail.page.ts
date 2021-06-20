import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MangaService} from '../../../../service/manga.service';
import {Manga} from '../../../../model/Manga';
import {Location} from '@angular/common';
import {DatabaseService} from '../../../../service/database.service';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.page.html',
  styleUrls: ['./manga-detail.page.scss'],
})
export class MangaDetailPage implements OnInit, AfterViewInit {
  mangaId!: number;
  manga!: Manga;
  isFavorite!: boolean;
  constructor(private activeRoute: ActivatedRoute,
              private mangaService: MangaService,
              private location: Location,
              private database: DatabaseService) { }

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

  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore("favoriteMangas");
    let favorites = [];
    let values = await this.database.getAllValues();
    for (let i = 0; i < values.length; i++) {
      favorites.push(JSON.parse(values[i]));
    }
    for (let j = 0; j < favorites.length; j++) {
      if (favorites[j].id == this.mangaId) {
        this.isFavorite = true;
      }
    }
  }

  async addToFavorite(): Promise<void> {

    let data: any = {'id':this.mangaId,'name':this.manga.title.romaji,'type':'MANGA'};
    await this.database.setItem(String(this.mangaId), JSON.stringify(data));
    this.isFavorite = true;
  }

  async removeFromFavorite(): Promise<void> {
    await this.database.removeItem(String(this.mangaId));
    this.isFavorite = false;
  }
}
