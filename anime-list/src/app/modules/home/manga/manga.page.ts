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
  mangas: Manga[] = [];
  page = 1;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private mangaService: MangaService,
              private router: Router,
              private database: DatabaseService) {}

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
      for (let i= 0; i < res.data.Page.media.length; i++) {
        this.mangas.push(res.data.Page.media[i]);
      }
    });
    this.page++;
    this.infiniteScroll.complete();
    }

  navigateToDetail(manga: Manga): void {
    this.router.navigateByUrl(`/manga/${manga.id}`);
  }
}
