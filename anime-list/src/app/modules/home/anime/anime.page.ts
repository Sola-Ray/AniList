import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Anime} from '../../../model/Anime';
import {AnimeService} from '../../../service/anime.service';
import {FilterAnimeModalComponent} from './component/filter-anime-modal/filter-anime-modal.component';

// Appelle le animeComponent

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
})
export class AnimePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterAnimeModalComponent,
      //cssClass: 'my-custom-class'
      componentProps: {
        'date': new Date()
      }
    });
    return await modal.present();
  }

  async onFilter() {
    await this.presentModal();
  }
}
