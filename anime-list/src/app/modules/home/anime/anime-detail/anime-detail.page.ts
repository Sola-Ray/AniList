import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Anime} from '../../../../model/Anime';
import {AnimeService} from '../../../../service/anime.service';
import {DatabaseService} from '../../../../service/database.service';
import {Share} from '@capacitor/share';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.page.html',
  styleUrls: ['./anime-detail.page.scss'],
})
export class AnimeDetailPage implements OnInit, AfterViewInit {

  animeId!: number;
  anime!: Anime;
  isFavorite!: boolean;
  constructor(private activeRoute: ActivatedRoute,
              private animeService: AnimeService,
              private location: Location,
              private database: DatabaseService) { }

  ngOnInit() {
    this.animeId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.animeService.getAnime(this.animeId).subscribe((result) => {
      this.anime = result.data.Page.media[0];
    });
  }
  return(): void {
    this.location.back();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore('favoriteAnime');
    const favorites = [];
    const values = await this.database.getAllValues();
    for (let i = 0; i < values.length; i++) {
      favorites.push(JSON.parse(values[i]));
    }
    for (let j = 0; j < favorites.length; j++) {
      if (favorites[j].id == this.animeId) {
        this.isFavorite = true;
      }
    }
  }

  async addToFavorite(): Promise<void> {
    const data: any = {id: this.animeId, name: this.anime.title.romaji, type:'ANIME'};
    await this.database.setItem(String(this.animeId), JSON.stringify(data));
    this.isFavorite = true;
  }

  async removeFromFavorite(): Promise<void> {
    await this.database.removeItem(String(this.animeId));
    this.isFavorite = false;
  }
  async share(): Promise<void> {
    await Share.share({
      title: this.anime.title.romaji,
      text: this.anime.description,
      url: 'https://anilist.co/anime/' + this.animeId,
    });
  }
}
