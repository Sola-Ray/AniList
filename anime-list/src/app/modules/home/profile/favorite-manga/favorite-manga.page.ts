import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../../../service/database.service';
import {Router} from '@angular/router';
import {ViewDidEnter, ViewWillLeave} from '@ionic/angular';

@Component({
  selector: 'app-favorite-manga',
  templateUrl: './favorite-manga.page.html',
  styleUrls: ['./favorite-manga.page.scss'],
})
export class FavoriteMangaPage implements OnInit, AfterViewInit, ViewDidEnter {
  favorites: any = [];
  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit() {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore('favoriteManga');
  }

  async loadDatas() {
    this.favorites = [];
    await this.database.openStore('favoriteManga');
    const values = await this.database.getAllValues();
    for (let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }
  }
  async ionViewDidEnter(): Promise<void> {
    await this.loadDatas();
  }

  navigateToDetail(media: any): void {
    this.router.navigateByUrl(`/manga/${media.id}`);
  }

}
