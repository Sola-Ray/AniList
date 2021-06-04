import { Component } from '@angular/core';
import {GraphqlService} from '../service/graphql.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private graphQlService: GraphqlService) {}

  loadDatas(): void {
    this.graphQlService.getMedias(1,20).subscribe((result: any) => {
      console.log(result);
    });
  }
}
