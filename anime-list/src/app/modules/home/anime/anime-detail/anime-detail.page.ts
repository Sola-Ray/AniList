import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Anime} from '../../../../model/Anime';
import {AnimeService} from '../../../../service/anime.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.page.html',
  styleUrls: ['./anime-detail.page.scss'],
})
export class AnimeDetailPage implements OnInit {

  animeId!: number
  anime!: Anime;
  constructor(private activeRoute: ActivatedRoute,
              private animeService: AnimeService,
              private location: Location) { }

  ngOnInit() {
    this.animeId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log(this.animeId);
    this.animeService.getAnime(this.animeId).subscribe((result) => {
      this.anime = result.data.Page.media[0];
    })
  }
  return(): void {
    this.location.back();
  }
}
