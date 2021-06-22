import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-filter-anime-modal',
  templateUrl: './filter-anime-modal.component.html',
  styleUrls: ['./filter-anime-modal.component.scss'],
})
export class FilterAnimeModalComponent implements OnInit {

  date: Date;
  rangeValue;

  season: string[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  pick: string;

  constructor(private modalController: ModalController, private pickerController: PickerController) {
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
    //if(this.pick != null && this.season != null) {
    this.modalController.dismiss({
      dismissed: true,
      season: this.pick,
      seasonYear: this.rangeValue
    });
    /*} else {
      this.presentToast('Select a date and a season please !');
    }*/
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
