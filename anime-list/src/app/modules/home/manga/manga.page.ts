import {Component, OnInit, ViewChild} from '@angular/core';
import {MangaService} from '../../../service/manga.service';
import {Manga} from '../../../model/Manga';
import {IonInfiniteScroll, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../service/database.service';
import {FilterMangaModalComponent} from './component/filter-manga-modal/filter-manga-modal.component';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.page.html',
  styleUrls: ['./manga.page.scss'],
})
export class MangaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  favorites = [];
  mangas: Manga[] = [];
  page = 1;
  modal: HTMLIonModalElement;
  genre: string;
  year: number;

  constructor(private mangaService: MangaService,
              private router: Router,
              private database: DatabaseService,
              private toastController: ToastController,
              private modalController: ModalController,) {}

  async ngOnInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore('favoriteManga');

    const values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }

    if(this.genre != null && this.year != null) {
      this.loadFilteredData(this.genre, this.year);
    } else {
      this.loadUnfilteredData();
    }
    this.page++;
    console.log(this.mangas);
  }

  loadData(event) {
    this.infiniteScroll = event.target;

    this.page++;
    if(this.genre != null && this.year != null) {
      this.loadFilteredData(this.genre, this.year);
    } else {
      this.loadUnfilteredData();
    }
    this.infiniteScroll.complete();
  }

  navigateToDetail(manga: Manga): void {
    this.router.navigateByUrl(`/manga/${manga.id}`);
  }

  async onFilter() {
    await this.presentModal();

    const { data } = await this.modal.onWillDismiss();

    if(data.genre != null && data.year != null) {
      this.genre = data.genre.Genre.value;
      this.year = data.year;
      this.mangas = [];
      this.page = 1;
      this.loadFilteredData(this.genre, this.year);
      this.presentToast('You have selected ' + this.genre + ' ' + this.year);
    } else if(data.stop) {
      this.mangas = [];
      this.page = 1;
      this.year = null;
      this.genre = null;
      this.loadUnfilteredData();
    }
  }

  loadFilteredData(genre: string, year: number): void {
    this.mangaService.getMangasByGenreYear(this.page,20, genre, year).subscribe((res) => {
      this.requestDatas(res);
    });
  }

  loadUnfilteredData(): void {
    this.mangaService.getMangas(this.page,20).subscribe((res) => {
      this.requestDatas(res);
    });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: FilterMangaModalComponent,
      componentProps: {
        date: new Date()
      }
    });
    return await this.modal.present();
  }

  private requestDatas(res: any) {
    for (let i = 0; i < res.data.Page.media.length; i++) {
      for (let j = 0; j < this.favorites.length; j++) {
        if (this.favorites[j].id === res.data.Page.media[i].id) {
          res.data.Page.media[i].isFavorite = true;
        }
      }
      this.mangas.push(res.data.Page.media[i]);
    }
  }
}
