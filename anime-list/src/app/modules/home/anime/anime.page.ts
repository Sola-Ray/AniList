import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController, ToastController} from '@ionic/angular';
import {FilterAnimeModalComponent} from './component/filter-anime-modal/filter-anime-modal.component';
import {Anime} from '../../../model/Anime';
import {AnimeService} from '../../../service/anime.service';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../service/database.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  modal: HTMLIonModalElement;
  season: string;
  seasonYear: number;
  animes: Anime[] = [];
  favorites = [];
  page = 1;

  constructor(public modalController: ModalController, private animeService: AnimeService,
              private router: Router,
              private database: DatabaseService,
  private toastController: ToastController) { }

  async ngOnInit() {
    await this.database.init();
    await this.database.openStore("favoriteAnime");

    let values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }

    if(this.season != null && this.seasonYear != null) {
      this.loadFilteredData(this.season, this.seasonYear);
    } else {
      this.loadUnfilteredData();
    }
    this.page++;
  }

  loadData(event) {
    this.infiniteScroll = event.target;

    if(this.season != null && this.seasonYear != null) {
      this.loadFilteredData(this.season, this.seasonYear);
    } else {
      this.loadUnfilteredData();
    }
    this.page++;
    this.infiniteScroll.complete();
  }

  navigateToDetail(anime: Anime): void {
    this.router.navigateByUrl(`/anime/${anime.id}`);
  }

  loadFilteredData(season: string, seasonYear: number): void {
    this.animeService.getAnimesBySeasonYear(this.page,20, season, seasonYear).subscribe((res) => {
      this.requestDatas(res);
    });
  }

  loadUnfilteredData(): void {
    this.animeService.getAnimes(this.page,20).subscribe((res) => {
      this.requestDatas(res);
    });
  }

  private requestDatas(res) {
    for (let i = 0; i < res.data.Page.media.length; i++) {
      for (let j = 0; j < this.favorites.length; j++) {
        if (this.favorites[j].id == res.data.Page.media[i].id) {
          res.data.Page.media[i].isFavorite = true;
        }
      }
      this.animes.push(res.data.Page.media[i]);
    }
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: FilterAnimeModalComponent,
      componentProps: {
        date: new Date()
      }
    });
    return await this.modal.present();
  }

  async onFilter() {
    await this.presentModal();

    const { data } = await this.modal.onWillDismiss();

    if(data.season != null && data.seasonYear != null) {
      this.season = data.season.Season.value;
      this.seasonYear = data.seasonYear;
      this.animes = [];
      this.loadFilteredData(this.season, this.seasonYear);
      this.presentToast('You have selected ' + this.season + ' ' + this.seasonYear);
    } else if(data.stop) {
      this.animes = [];
      this.seasonYear = null;
      this.season = null;
      this.loadUnfilteredData();
    }
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
