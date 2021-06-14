import {Component, Input, OnInit} from '@angular/core';
import { ModalController} from '@ionic/angular';

@Component({
  selector: 'app-filter-anime-modal',
  templateUrl: './filter-anime-modal.component.html',
  styleUrls: ['./filter-anime-modal.component.scss'],
})
export class FilterAnimeModalComponent implements OnInit {

  rangeValue = 1950;
  @Input() date: Date;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  return(): void {
    this.modalController.dismiss();
  }
}
