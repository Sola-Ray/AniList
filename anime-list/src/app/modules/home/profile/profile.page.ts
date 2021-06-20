import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentTab!: string;

  constructor() {}

  ngOnInit(): void {
  }

  public onTabChanged(tabChanged: any) {
    this.currentTab = tabChanged.tab;
  }
}
