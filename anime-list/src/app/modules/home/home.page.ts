import {Component, OnInit} from '@angular/core';
import {Manga} from '../../model/Manga';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentTab: string = 'anime';

  constructor() {}

  ngOnInit(): void {
  }

  public onTabChanged(tabChanged: any) {
    this.currentTab = tabChanged.tab;

  }
}
