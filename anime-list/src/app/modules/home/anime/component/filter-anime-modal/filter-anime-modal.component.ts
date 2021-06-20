import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-filter-anime-modal',
  templateUrl: './filter-anime-modal.component.html',
  styleUrls: ['./filter-anime-modal.component.scss'],
})
export class FilterAnimeModalComponent implements OnInit {

  @Input() date: Date;
  rangeValue;

  season: string[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
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
        name:'Season',
        options:this.getColumnOptions()
      }]
    };

    const picker = await this.pickerController.create(options);
    await picker.present();
  }

  getColumnOptions(){
    const options = [];
    this.season.forEach(x => {
      options.push({text:x,value:x});
    });
    return options;
  }

  validate(): void {
    if(this.pick != null && this.season != null) {
      this.modalController.dismiss({
        dismissed: true,
        season: this.pick,
        seasonYear: this.rangeValue
      });
    } else {
      this.presentToast('Select a date and a season please !');
    }
  }

  stop(): void {
    this.modalController.dismiss({
      dismissed: true,
      stop: true
    });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
