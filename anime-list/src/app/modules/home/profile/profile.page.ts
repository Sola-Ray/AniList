import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Media} from '../../../model/Media';
import {DatabaseService} from '../../../service/database.service';
import {Manga} from '../../../model/Manga';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {
  favorites: any = [];
  constructor(private database: DatabaseService,
              private router: Router,) { }

  ngOnInit() {
  }
  async ngAfterViewInit(): Promise<void> {
    await this.database.init();
    await this.database.openStore("favoriteMangas");

    let values = await this.database.getAllValues();
    for(let i = 0; i < values.length; i++) {
      this.favorites.push(JSON.parse(values[i]));
    }
      console.log(this.favorites);

  }

  navigateToDetail(media: any): void {
    console.log(typeof (media.type));
    console.log(media.type === 'MANGA');
    console.log(media.type);
    if(media.type === 'MANGA') {
      this.router.navigateByUrl(`/manga/${media.id}`);
    }
    if(media.type === 'ANIME') {
      this.router.navigateByUrl(`/anime/${media.id}`);
    }
  }
}
