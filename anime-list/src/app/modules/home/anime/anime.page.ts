import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {Anime} from '../../../model/Anime';
import {AnimeService} from '../../../service/anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  animes: Anime[] = [];
  page = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private animeService: AnimeService,
              private router: Router) {}

  ngOnInit(): void {
    this.animeService.getAnimes(this.page,20).subscribe((res) => {
      for(let i= 0; i < res.data.Page.media.length; i++) {
        this.animes.push(res.data.Page.media[i]);
      }
    });
    this.page++;
    console.log(this.animes);
  }

  loadData(event) {
    this.infiniteScroll = event.target;
    console.log('infinite');
    this.animeService.getAnimes(this.page,20).subscribe((res) => {
      for(let i= 0; i < res.data.Page.media.length; i++) {
        this.animes.push(res.data.Page.media[i]);
      }
    });
    this.page++;
    this.infiniteScroll.complete();
  }

  navigateToDetail(anime: Anime): void {
    this.router.navigateByUrl(`/anime/${anime.id}`);
  }

}
