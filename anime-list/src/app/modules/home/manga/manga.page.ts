import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MangaService} from '../../../service/manga.service';
import {Manga} from '../../../model/Manga';
import {IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';
import {DatabaseService} from '../../../service/database.service';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.page.html',
  styleUrls: ['./manga.page.scss'],
})
export class MangaPage implements OnInit {
  favorites = [];
  mangas: Manga[] = [];
  page = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private mangaService: MangaService,
              private router: Router,
              private database: DatabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore("favoriteManga");

    let values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }

   this.requestDatas();
  }

  loadData(event) {
    this.infiniteScroll = event.target;
    this.requestDatas();
    this.infiniteScroll.complete();
    }

  private requestDatas() {
    this.mangaService.getMangas(this.page, 20).subscribe((res) => {
      for (let i = 0; i < res.data.Page.media.length; i++) {
        for (let j = 0; j < this.favorites.length; j++) {
          if (this.favorites[j].id == res.data.Page.media[i].id) {
            res.data.Page.media[i].isFavorite = true;
          }
        }
        this.mangas.push(res.data.Page.media[i]);
      }
    });
    this.page++;
  }

  navigateToDetail(manga: Manga): void {
    this.router.navigateByUrl(`/manga/${manga.id}`);
  }
}
