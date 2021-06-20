import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../../../service/database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-anime',
  templateUrl: './favorite-anime.page.html',
  styleUrls: ['./favorite-anime.page.scss'],
})
export class FavoriteAnimePage implements OnInit, AfterViewInit {
  favorites: any = [];
  constructor(private database: DatabaseService,
              private router: Router,) { }

  ngOnInit() {
  }
  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore('favoriteAnime');

    const values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }

  }

  navigateToDetail(media: any): void {
    this.router.navigateByUrl(`/anime/${media.id}`);
  }
}
