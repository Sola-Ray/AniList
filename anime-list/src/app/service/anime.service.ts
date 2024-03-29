import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


const queries = {
  // eslint-disable-next-line max-len
  query : (page: number, perPage: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: ANIME, isAdult:${false}){id type title { romaji english native } description season seasonYear status format source coverImage { extraLarge large medium } bannerImage synonyms genres averageScore isAdult episodes duration}}}`,
  // eslint-disable-next-line max-len
  queryDetail : (id: number) => `query{  Page(page:1,perPage:1){media(type: ANIME, id: ${id} ) { id type title {romaji english native } description season seasonYear status format source coverImage { extraLarge large medium} bannerImage synonyms genres averageScore isAdult episodes duration meanScore favourites}}}`,
  // eslint-disable-next-line max-len
  querySeasonYear : (page: number, perPage: number, season: string, seasonYear: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: ANIME, season:${season}, seasonYear:${seasonYear}, isAdult:${false}){id type title { romaji english native } description season seasonYear status format source coverImage {extraLarge large medium } bannerImage synonyms genres averageScore isAdult episodes duration}}}`,
  // eslint-disable-next-line max-len
  queryYear : (page: number, perPage: number, seasonYear: number) => `query{Page(page:${page},perPage: ${perPage}){media(type: ANIME, seasonYear:${seasonYear}, isAdult:${false}){id type title { romaji english native } description season seasonYear status format source coverImage {extraLarge large medium } bannerImage synonyms genres averageScore isAdult episodes duration}}}`
};

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient) {
  }

  getAnimes(page: number, perPage: number): Observable<any> {
    const body = JSON.stringify({query: queries.query(page, perPage), variables: null});
    return this.http.post<any>(environment.aniListUri, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getAnimesBySeasonYear(page: number, perPage: number, season: string, seasonYear: number): Observable<any> {
    const body = JSON.stringify({query: queries.querySeasonYear(page, perPage, season, seasonYear), variables: null});
    console.log(body);
    return this.http.post<any>(environment.aniListUri, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getAnimesByYear(page: number, perPage: number, seasonYear: number): Observable<any> {
    const body = JSON.stringify({query: queries.queryYear(page, perPage, seasonYear), variables: null});
    console.log(body);
    return this.http.post<any>(environment.aniListUri, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getAnime(id: number): Observable<any> {
    const body = JSON.stringify({query: queries.queryDetail(id), variables: null});
    return this.http.post<any>(environment.aniListUri, body, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}
