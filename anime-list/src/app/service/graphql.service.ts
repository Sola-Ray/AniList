import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Manga} from '../model/Manga';
import {Season} from '../model/Season';

const queries = {
  // eslint-disable-next-line max-len
  query : (page: number, perPage: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA){id type title { romaji english native } description season seasonYear status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes episodes duration } } }`,
  querySeason : (page: number, perPage: number, year: number, season: Season) => `query{Page(page:${page},perPage: ${perPage}){media(type: MANGA, seasonYear: ${year}, season: ${season}){id type title { romaji english native } description season seasonYear status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult chapters volumes episodes duration } } }`,
};

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private http: HttpClient) { }

  getMangas(page: number, perPage: number): Manga[] {
    const mangas: Manga[] = [];
    const body = JSON.stringify({ query : queries.query(page, perPage), variables: null});
    console.log(body);

    this.http.post<any>(environment.aniListUri, body, {headers: {'Content-Type' : 'application/json','Accept' : 'application/json' }})
      .subscribe((res) => {
        for(let i= 0; i < res.data.Page.media.length; i++) {
          mangas.push(res.data.Page.media[i]);
        }
      });
    return mangas;
  }
}
