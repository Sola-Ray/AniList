import {Component, OnInit, ViewChild} from '@angular/core';
import {MangaService} from '../../../service/manga.service';
import {Manga} from '../../../model/Manga';
import {IonInfiniteScroll} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.page.html',
  styleUrls: ['./manga.page.scss'],
})
export class MangaPage implements OnInit {
  mangas: Manga[] = [];
  page = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private mangaService: MangaService,
              private router: Router) {}

  ngOnInit(): void {
    this.mangaService.getMangas(this.page,20).subscribe((res) => {
      for(let i= 0; i < res.data.Page.media.length; i++) {
        this.mangas.push(res.data.Page.media[i]);
      }
    });
    this.page++;
    console.log(this.mangas);
  }

  loadData(event) {
    this.infiniteScroll = event.target;
    console.log('infinite');
    this.mangaService.getMangas(this.page,20).subscribe((res) => {
      for(let i= 0; i < res.data.Page.media.length; i++) {
        this.mangas.push(res.data.Page.media[i]);
      }
    });
    this.page++;
    this.infiniteScroll.complete();
    }

  navigateToDetail(manga: Manga): void {
    this.router.navigateByUrl(`/manga/${manga.id}`);
  }

  addToFavorite(): void {
    console.log('added');
  }
}
