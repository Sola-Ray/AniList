import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {Anime} from '../../../model/Anime';
import {AnimeService} from '../../../service/anime.service';

// Appelle le animeComponent

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  async onFilter() {
    
  }
}
