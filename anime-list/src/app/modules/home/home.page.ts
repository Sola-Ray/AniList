import {Component, OnInit} from '@angular/core';
import {GraphqlService} from '../../service/graphql.service';
import {Manga} from '../../model/Manga';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mangas!: Manga[];
  currentTab: string = 'anime';

  constructor(private graphQlService: GraphqlService) {}

  ngOnInit(): void {
    this.mangas = this.graphQlService.getMangas(1,20);
    console.log(this.mangas);
  }

  public onTabChanged(tabChanged: any) {
    this.currentTab = tabChanged.tab;

  }
}
