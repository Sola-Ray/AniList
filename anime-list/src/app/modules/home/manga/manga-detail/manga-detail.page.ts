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

    let favorites = await this.database.getAllValues();
    this.isFavorite = favorites.includes(String(this.mangaId));
    console.log(this.isFavorite);
  }

  async addToFavorite(): Promise<void> {

    await this.database.setItem(String(this.mangaId), String(this.mangaId));
    let result = await this.database.getItem(String(this.mangaId));
    if(result != null) {
      this.isFavorite = true;
    }
  }

  async removeFromFavorite(): Promise<void> {
    await this.database.removeItem(String(this.mangaId));
    let result = await this.database.getItem(String(this.mangaId));
    if(result == null) {
      this.isFavorite = false;
    }
  }
}
