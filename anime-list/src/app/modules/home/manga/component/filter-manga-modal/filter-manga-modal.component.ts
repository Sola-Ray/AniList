import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import {Toast} from '@capacitor/toast';

@Component({
  selector: 'app-filter-anime-modal',
  templateUrl: './filter-manga-modal.component.html',
  styleUrls: ['./filter-manga-modal.component.scss'],
})
export class FilterMangaModalComponent implements OnInit {

  date: Date;
  rangeValue;

  genre: string[] = ['Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Ecchi',
    'Fantasy',
    'Horror',
    'Mahou Shoujo',
    'Mecha',
    'Music',
    'Mystery',
    'Psychological',
    'Romance',
    'Sci-Fi',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller'];
  pick: string;

  constructor(private modalController: ModalController, private pickerController: PickerController,
              private toastController: ToastController) {
  }

  ngOnInit() {
    this.rangeValue = this.date.getFullYear();
  }

  return(): void {
    this.modalController.dismiss({
    });
  }

  async showPicker() {
    const options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value: any) => {
            this.pick = value;
          }
        }
      ],
      columns:[{
        name:'Genre',
        options:this.getColumnOptions()
      }]
    };

    const picker = await this.pickerController.create(options);
    await picker.present();
  }

  getColumnOptions(){
    const options = [];
    this.genre.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }

  validate(): void {
    if(this.pick != null && this.genre != null) {
      this.modalController.dismiss({
        dismissed: true,
        genre: this.pick,
        year: this.rangeValue
      });
    } else {
      this.presentToast('Select a date and a genre please !');
    }
  }

  stop(): void {
    this.modalController.dismiss({
      dismissed: true,
      stop: true
    });
  }

  async presentToast(text: string) {
    await Toast.show({
      text,
      duration: 'long',
      position: 'bottom'
    });
  }
}
