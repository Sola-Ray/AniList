import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../../../service/database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-manga',
  templateUrl: './favorite-manga.page.html',
  styleUrls: ['./favorite-manga.page.scss'],
})
export class FavoriteMangaPage implements OnInit, AfterViewInit {
  favorites: any = [];
  constructor(private database: DatabaseService,
              private router: Router,) { }

  ngOnInit() {
  }
  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore('favoriteManga');
    const values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }
  }

  navigateToDetail(media: any): void {
    this.router.navigateByUrl(`/manga/${media.id}`);
  }
}
