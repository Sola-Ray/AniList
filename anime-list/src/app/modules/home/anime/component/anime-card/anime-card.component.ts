import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Anime} from '../../../../../model/Anime';
import {IonInfiniteScroll} from '@ionic/angular';
import {AnimeService} from '../../../../../service/anime.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.scss'],
})
export class AnimeCardComponent implements OnInit {

  animes: Anime[] = [];
  page = 1;
  @Input() item = 'Item';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private animeService: AnimeService,
              private router: Router) {}

  ngOnInit(): void {
    console.log(this.item);
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
